# Marker

React S3 Art Gallery

## Resources
  
- <https://www.youtube.com/watch?v=b6Oe2puTdMQ>
- <https://github.com/FortAwesome/react-fontawesome>
- <https://github.com/FortAwesome/react-fontawesome#installation>

## Tech

- JWT
- FileUpload
- AWS S3
- React-Pose
- md5
- Material UI
- concurrently

```json
"scripts": {
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "cd client && yarn start",
  "dev": "concurrently \"yarn run server\" \"yarn run client\"",
}
```

## Responsive

- Login / Signup modal goes full screen on mobile view
- Nav bar hides active page
- Profile Dropdown with Username

## Backend Validation

- Unique username and email
- File Size
- File Type
- No Profile when logged out
- Routes are protected, incase you go directly to it
- API's protected by JWT (ToDo: finish some of the draft routes)
- .env file for AWS S3 and JWT secrets
- alert messages have themes

```zsh
[0] mime type is:  image/jpeg
[0] md5 hash of file:  4cc0fd8432495fe306f07654f42571a8
[0] The returned ETag:  4cc0fd8432495fe306f07654f42571a8
[0] Do they equal?  true
```

## Animations

- Staggered roll in on nav
- Color changing section header
- Title changing section header
- Progress around button. Documentation issue?
  - <https://material-ui.com/components/progress/#interactive-integration>
  - `zIndex: 1,` vs `zIndex: -1,`


## The Button

- Select a file. Images only by default
- File Upload
  - File Type
  - File Size
  - Setting hash name (md5)
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
- Display the image (the S3 url) saved to the record
- Progress indicator disappears after 10 seconds

## Draft Managment

- Create new draft
- Update draft
- Delete draft
- Submit draft

## Next Steps

### Progressive Image Loading (with Skeletons)

### :skull: Skeletons

The (typically) grey place holder before some content has loaded enough to start displaying. CSS animations like pulse or side wide are common, to give a sense something is happening in the background.

Triggering the Skelly on/off can e as simple as some grey divs that display when a state is true, and hide when false. Successful response from the api call can trigger that state to toggle to false, which reveals the else clause: divs for the real content.

<https://medium.com/@perjansson/a-progressive-image-loader-in-react-f14ae652619d>

- const image = new Image() => creates an empty html img tag
- set the src attribute for that tag => image.src = src

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
- <https://www.npmjs.com/package/sharp>
