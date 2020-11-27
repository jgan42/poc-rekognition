import AWS from 'aws-sdk';
import firebase from 'firebase/app';
import 'firebase/database';
import fetch from 'node-fetch';

firebase.initializeApp({
  apiKey: 'AIzaSyBK0Qxvg1GL2lMa1gWyZGNmK_v0o25d6jc',
  authDomain: 'poc-focuspoint.firebaseapp.com',
  databaseURL: 'https://poc-focuspoint.firebaseio.com',
  projectId: 'poc-focuspoint',
  storageBucket: 'poc-focuspoint.appspot.com',
  messagingSenderId: '484040658105',
  appId: '1:484040658105:web:9f5995455813c0981a1f68',
});

AWS.config.update({ region: 'eu-west-1' });

const R = new AWS.Rekognition();

const getBlob = async (imageUrl: string) => (await fetch(imageUrl)).buffer();

const getRekognitionData = async (imageUrl: string) => {
  try {
    const Bytes = await getBlob(imageUrl);
    const { Labels } = await R.detectLabels({ Image: { Bytes } }).promise();
    const { FaceDetails } = await R.detectFaces({ Image: { Bytes } }).promise();
    const { TextDetections } = await R.detectText({ Image: { Bytes } }).promise();
    return { imageUrl, Labels, FaceDetails, TextDetections };
  } catch (e) {
    console.error('e', e);
    return null;
  }
};

const urls = [
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F6905c808-027c-4e56-9fb9-92feece1a33a.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Fdb29217e-ab24-461b-af63-59413a40a2e1.2Ejpeg/1382x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F10750c2d-3e22-4f8e-aff1-2f7c80094e6d.2Ejpeg/713x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F40b3e65e-f6bd-4f39-a695-0cd75e319898.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Fb7308cc2-c8b7-4c91-bae1-82c250a43c14.2Ejpeg/684x924/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F1793986a-569b-42b8-ac69-3db62d9420fe.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Faa303629-3448-447a-a33d-df4ca98d9dc3.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F6b929efd-5f3f-4953-b315-80f5267ae743.2Ejpeg/810x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F2a173b5b-2883-46bb-892e-c1fbf735122d.2Ejpeg/799x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F84a64c4f-726d-4f13-884e-a097bfa25cf7.2Ejpeg/724x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F9bd5f6c2-c088-4050-b854-a695d234094d.2Ejpeg/1436x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F62e9de34-3f0d-4666-8ec4-fc96b8ca0d6e.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Fedcd4f61-9c46-4197-ba3a-b7c1fa85f82f.2Ejpeg/724x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F8f07351f-f424-4800-a6b3-ddbcd755f4ef.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F5d3c15cf-29fa-4a34-b42c-3683e428686a.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F13c08383-73d9-4f8d-b693-2813a6a94711.2Ejpeg/1555x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Fde2e7cdb-e4e1-4ffe-b542-bb5541686062.2Ejpeg/1415x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F4d70e88a-f611-4313-b60e-5f7d39b29bd6.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Fa64f744d-020d-4a31-b6c6-9a28da4f2aa7.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F16039143-ebed-4f25-9838-b5083976dc7f.2Ejpeg/1620x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2Fa1c3cc1e-2e05-4213-8146-90a92009d1c9.2Ejpeg/1696x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F236bc02f-4326-4349-bf9f-38192a8217a0.2Ejpeg/1544x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F1149df9d-fab5-434b-b176-eada822d9ace.2Ejpeg/864x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F23ca70bb-c3ed-42aa-b0f2-b375459b72e5.2Ejpeg/767x1080/quality/80/transformation.jpg',
  'https://one.img.pmdstatic.net/fit/http.3A.2F.2Frec2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2020.2F11.2F27.2F7bc543de-898e-4ff6-8158-7560c88cf8e6.2Ejpeg/810x1080/quality/80/transformation.jpg',
];

Promise.all(urls.map((url) => getRekognitionData(url)))
  .then((list) =>
    firebase
      .database()
      .ref('list')
      .set(list.filter((data) => !!data)),
  )
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Global error', error);
    return process.exit(1);
  });
