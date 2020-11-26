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
  // const data = await R.detectLabels({ Image: { Bytes: '/9j/4AAQSkZJRgABAQABLAEsAAD/7RDuUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAD6AcAgAAAgACHAIHAAhFTl9DT1VSUxwCtwAHQ1BfMTI1MhwCuwAhQ0FFNDA5NzhCMTVGNDE1QSA4NDE2NkYxQTlENzEzMTRFHALwD1UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOEJJTQPtAAAAAAAQASwAAAABAAIBLAAAAAEAAjhCSU0D8wAAAAAACAAAAAAAAAAAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAAAvZmYAAQChmZoABgAAAAAAAAAyAAAAAQBaAAAABgAAAAAAAAA1AAAAAQAtAAAABgAAAAAAADhCSU0EJQAAAAAAENvU9CIYHKW6YQ27Xikk07Q4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAA/+ENImh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6Y3JzPSJodHRwOi8vbnMuYWRvYmUuY29tL2NhbWVyYS1yYXctc2V0dGluZ3MvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZndyPSJodHRwOi8vbnMuZm90b3dhcmUuY29tL2lwdGN4bXAtcmVzZXJ2ZWQvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczpwcHBob3Rvcz0iaHR0cDovL25zLnByaXNtYS1wcmVzc2UuY29tL3BwLXhtcC8xLjAvUGhvdG9zIgogICAgICAgICAgICB4bWxuczpmd2w9Imh0dHA6Ly9ucy5mb3Rvd2FyZS5jb20vaXB0Y3htcC1sZWdhY3kvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMTE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjM5PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+MzAwMDAwMDAvMTAwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAwMDAwMC8xMDAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxjcnM6SGFzQ3JvcD5GYWxzZTwvY3JzOkhhc0Nyb3A+CiAgICAgICAgIDxmd3I6VW5pcXVlSWQ+Q0FFNDA5NzhCMTVGNDE1QSA4NDE2NkYxQTlENzEzMTRFPC9md3I6VW5pcXVlSWQ+CiAgICAgICAgIDxmd3I6VXBsb2FkSW5mbyByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxmd3I6VXBsb2FkZWRCeT5qcC5nYW5AcHJpc21hLXByZXNzZS5jb208L2Z3cjpVcGxvYWRlZEJ5PgogICAgICAgICAgICA8ZndyOlVwbG9hZGVkQnlGdWxsTmFtZT5KZWFuIHBhdWwgR0FOPC9md3I6VXBsb2FkZWRCeUZ1bGxOYW1lPgogICAgICAgICAgICA8ZndyOlVwbG9hZFRpbWU+MjAyMC0wMS0wMlQxNToxMDo1MS4zOTU2Mjg8L2Z3cjpVcGxvYWRUaW1lPgogICAgICAgICA8L2Z3cjpVcGxvYWRJbmZvPgogICAgICAgICA8eG1wOlhNUEZpbGVTdGFtcHM+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPjIwMjAtMDEtMDJUMTU6MTA6NTErMDE6MDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4yMDIwLTAxLTAyVDE1OjEwOjUxKzAxOjAwPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXA6WE1QRmlsZVN0YW1wcz4KICAgICAgICAgPHBwcGhvdG9zOklEX3N1YmplY3Q+YmFiMmQ4YmQtMjQzNS00ODY1LWFlZDMtMjE2YjA4NTk1MWQ3PC9wcHBob3RvczpJRF9zdWJqZWN0PgogICAgICAgICA8cHBwaG90b3M6QmFja3VwTmFtZT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGk+c2FsYW1lY2hlLmpwZWc8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3BwcGhvdG9zOkJhY2t1cE5hbWU+CiAgICAgICAgIDxwcHBob3RvczpEZWxpdmVyeUFjY291bnQ+anAuZ2FuQHByaXNtYW1lZGlhLmNvbTwvcHBwaG90b3M6RGVsaXZlcnlBY2NvdW50PgogICAgICAgICA8cHBwaG90b3M6U3ViamVjdD5ob3Jvc2NvcGUgdGwgMTc2OTwvcHBwaG90b3M6U3ViamVjdD4KICAgICAgICAgPHBwcGhvdG9zOkRlcGFydG1lbnQ+TE9JU0lSUzwvcHBwaG90b3M6RGVwYXJ0bWVudD4KICAgICAgICAgPHBwcGhvdG9zOlNlY3Rpb24+QVNUUk9MT0dJRTwvcHBwaG90b3M6U2VjdGlvbj4KICAgICAgICAgPHBwcGhvdG9zOklkUGhvdG9QcmlzbWE+UFRWU18yNFBUWFJJRzZXSC5qcGVnPC9wcHBob3RvczpJZFBob3RvUHJpc21hPgogICAgICAgICA8ZndsOkVkaXRTdGF0dXM+RU5fQ09VUlM8L2Z3bDpFZGl0U3RhdHVzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pv/hAIBFeGlmAABNTQAqAAAACAAFARIACQAAAAEAAAABARoABQAAAAEAAABKARsABQAAAAEAAABSASgACQAAAAEAAAACh2kABAAAAAEAAABaAAAAAAAtxsAAACcQAC3GwAAAJxAAAqACAAkAAAABAAAA06ADAAkAAAABAAAA7wAAAAD/2wCEAAkGBxAPEBUQEBAVFRUWFRUXFRgVFhUWFxcVFRcWGBUVFhUYHSggGholGxgVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lHyUtKy0uLS8tLS0uLS0tLy0tLy8tLS0tLS8tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAO8A0wMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHAgj/xABJEAACAQIDBAYGBgULAwUAAAABAgADEQQSIQUGMUETIlFhcYEyQlJykaEUI2KCkrEHM7LB0RU0Q1Njc5Ois8Lw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' } }).promise();
  const data = await R.describeProjects().promise();
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
