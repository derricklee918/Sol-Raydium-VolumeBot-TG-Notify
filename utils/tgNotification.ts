import axios, { AxiosResponse } from 'axios';

const token: string = '7382012019:AAE8woS215ZH3OSQrvUEbC72rl3Iyv18f-4';
const chatId: string = '@volume_bot_for_flux'; // or use the channel ID, e.g., '-1001234567890'

interface TelegramResponse {
  ok: boolean;
  result: {
    message_id: number;
    chat: {
      id: number;
      title: string;
      type: string;
    };
    date: number;
    text: string;
  };
}

export const sendMessage = async (message: string): Promise<void> => {
  const url: string = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const response: AxiosResponse<TelegramResponse> = await axios.post(url, {
      chat_id: chatId,
      text: `${message}\n\n🎉 Congratulations!`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Buy Now',
              url: 'https://raydium.io/swap/?inputMint=sol&outputMint=7gKKuhBUQzgsWcMt9vuAaazrdN6wcNveRYcwyZFfJWYF' // Replace with your actual buy link
            }
          ]
        ]
      }
    });

    if (response.data.ok) {
      // console.log('Message sent successfully:', response.data.result);
    } else {
      console.error('Failed to send message:', response.data);
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

export const obfuscateString = (input: string): string => {
  if (input.length <= 8) {
    return input; // If the string is too short, return it as is
  }

  const firstPart = input.substring(0, 4); // First 4 characters
  const lastPart = input.substring(input.length - 4); // Last 4 characters

  return `${firstPart}****${lastPart}`;
}