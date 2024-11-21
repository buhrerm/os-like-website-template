import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const channelUrl = 'https://www.youtube.com/@MMEDSPLS/videos';
    const response = await axios.get(channelUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    const html = response.data;

    // Extract the initial data that YouTube injects into the page
    const ytInitialData = JSON.parse(html.split('var ytInitialData = ')[1].split(';</script>')[0]);

    // Navigate to the correct part of the data structure
    const contents =
      ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content
        .richGridRenderer.contents;

    const videos = contents
      .filter((item) => item.richItemRenderer && item.richItemRenderer.content.videoRenderer)
      .slice(0, 6)
      .map((item) => {
        const videoRenderer = item.richItemRenderer.content.videoRenderer;
        return {
          id: videoRenderer.videoId,
          title: videoRenderer.title.runs[0].text,
          thumbnail: videoRenderer.thumbnail.thumbnails[0].url,
          views: videoRenderer.viewCountText.simpleText,
          publishedAt: videoRenderer.publishedTimeText.simpleText,
        };
      });

    if (videos.length === 0) {
      throw new Error('No videos found. YouTube structure might have changed.');
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    res.status(500).json({ error: 'Error fetching YouTube videos', details: error.message });
  }
}
