import AWS from 'aws-sdk';
import fetch from 'node-fetch';

AWS.config.update({ region: 'eu-west-1' });

const R = new AWS.Rekognition();

const getBlob = async (imageUrl: string) => (await fetch(imageUrl)).buffer();

const getRekognitionData = async (imageUrl: string) => {
  const Bytes = await getBlob(imageUrl);
  const labels = await R.detectLabels({ Image: { Bytes } }).promise();
  const faces = await R.detectFaces({ Image: { Bytes } }).promise();
  const texts = await R.detectText({ Image: { Bytes } }).promise();
  console.log('data', labels, faces, texts);
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
