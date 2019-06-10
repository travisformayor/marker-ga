# Readme

## Notes

Backend validation on login/signup fields
Front end validation
material-ui form components, dialog (modal)
Login / Signup modal goes full screen on mobile view

User flow...
logging out dumps you to main
logging in shows profile in nav
being logged out removes profile from nav
nav only shows pages you are not currently on
react-pose
<https://www.youtube.com/watch?v=b6Oe2puTdMQ>

<https://github.com/FortAwesome/react-fontawesome>
<https://fontawesome.com/how-to-use/on-the-web/styling/layering>

## File Upload Example Notes

Code along with: <https://www.youtube.com/watch?v=b6Oe2puTdMQ&t=1s>

```zsh
touch server.js
# makes the package.json
npm init -y
yarn add express express-fileupload
# add dev dependencies
yarn add -D nodemon concurrently
```

```json
// package.json
...
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\"",
}
```

Setup server.js, then

```zsh
create-react-app client
```

## Font Awesome React

<https://github.com/FortAwesome/react-fontawesome#installation>

in the react client folder...

```zsh
# in /client...
yarn add @fortawesome/free-brands-svg-icons
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-solid-svg-icons
yarn add @fortawesome/react-fontawesome
```

## File Upload

Front end and back end file validation for:

- File Type
- File Size
- Setting generic name (uuid)
- Scrubbing metadata

## Progressive Image Loading (with Skeletons)

- <https://medium.com/@perjansson/a-progressive-image-loader-in-react-f14ae652619d>
  - const image = new Image() => creates an empty html img tag
  - set the src attribute for that tag => image.src = src
  
### :skull: Skeletons

The (typically) grey place holder before some content has loaded enough to start displaying. CSS animations like pulse or side wide are common, to give a sense something is happening in the background.

Triggering the Skelly on/off can e as simple as some grey divs that display when a state is true, and hide when false. Successful response from the api call can trigger that state to toggle to false, which reveals the else clause: divs for the real content.

### Progressive Loading

Progressive is a real method of encoding an image like a JPEG, where the data loads in over the whole area instead of top to bottom. What you get is an image that starts off pixelate and gets more detail as it loads, vs empty space that slowly fills in from the top. However the file needs to be specially prepared for this to work. But we can fake it!

- First generate a super small super low res thumbnail of the image (like 20px by 20px)
- Load that small image, stretched to fit the space, and toss a CSS blur on it
- Load the full res image in the background
- When its loaded, switch it out with the low res one, and transition the CSS blur away

- Axios request
  - get all the text and the urls of the micro-thumb and big image
  - display the text and the micro-thumb, blurred, replacing the css pulsing skelly on axios response
  - the client is now downloading the large file too, tracked with image.onload in the medium post
  - once the large file is done, transition the blurred low res one with the nice high res one and replace it
progressive loading - small thumbnail with blur while waiting on the large file ti finish
npm sharp - makes low res thumbnails
  - make a nice thumbnail for displaying
  - make a micro thumbnail for progressive loading

## Other Stuff

note: switch from market to gallery in final readme challenges

<https://www.npmjs.com/package/dotenv>
for env's like s3 credentials and jwt secret key

- shows username in profile avatar drop down
- alert message has themes you can toggle

While Processing

```zsh
[0] mime type is:  image/jpeg
[0] md5 hash of file:  4cc0fd8432495fe306f07654f42571a8
[0] The returned ETag:  4cc0fd8432495fe306f07654f42571a8
[0] The files md5 hash:  4cc0fd8432495fe306f07654f42571a8
[0] Do they equal?  true
```

What does the (+) button do

- Select a file. Images only by default
- Upload the file
- Disable / Grey out button during upload
- Text switches from base to uploading to processing to done
- Displays upload progress from axios
- Displays backend processing
  - Abort on file above max filesize
  - Validate file type (jpg or png)
  - Rename file to it's md5 hash and filetype
  - Upload to AWS S3
  - Verify the files hash matches the one returned from S3
- Display any error or info/success messages
- Display the image (the S3 url)
- Progress indicator disappears after 10 seconds
- To Do: Progressive load image

Progressive Loading

First, you need a micro-thumbnail
