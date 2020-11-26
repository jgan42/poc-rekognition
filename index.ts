import AWS from 'aws-sdk';
import fetch from 'node-fetch';

AWS.config.update({ region: 'eu-west-1' });

const R = new AWS.Rekognition();

const getBlob = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  return buffer.toString('base64');
};

const getRekognitionData = async (imageUrl: string) => {
  const data = await R.detectLabels({ Image: { url: imageUrl } } as any).promise();
  console.log('data', data);
};

const urls = [
  'https://firebasestorage.googleapis.com/v0/b/ludo-chatillon.appspot.com/o/BTV_000842.jpg?alt=media&token=e6ddfa21-1ac9-4e59-b533-93f54dfa479f',
];

Promise.all(urls.map((url) => getRekognitionData(url)))
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('error', error);
    return process.exit(1);
  });
