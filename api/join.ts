// /api/join.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const KAHOOT_API_URL = 'https://kahoot.it/rest/kahoots';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { gameCode, botName, botCount } = req.body;

  if (!gameCode || !botName || botCount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid parameters.' });
  }

  try {
    for (let i = 1; i <= botCount; i++) {
      const name = `${botName}#${i}`;
      console.log(`Attempting to join: ${name} to game ${gameCode}`);
      
      await axios.post(`${KAHOOT_API_URL}/join`, {
        gameCode,
        name
      });

      console.log(`Joined ${name} successfully!`);
    }
    
    res.status(200).json({ success: true, message: `Successfully joined ${botCount} bots.` });
  } catch (error) {
    console.error('Error joining bots:', error.message);
    res.status(500).json({ success: false, message: 'Failed to join bots.' });
  }
}
