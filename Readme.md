# Marker

React S3 Art Gallery

## Overview

Marker is a React app built to explore file upload, backend image processing, AWS S3 apis, and React component animations. Users can create an account, create draft submissions they can update over time or delete, upload images, and submit a final version to the gallery. The upload button has progress tracking, backend validation on file size and file type, creates a thumbnail, uses hashing for file name and data upload verification, and uploads the image and thumbnail to AWS S3.

![Screenshot](/readme/minimain.png)

## Resources
  
- <https://www.youtube.com/watch?v=b6Oe2puTdMQ>
- <https://github.com/FortAwesome/react-fontawesome#installation>
- <https://www.npmjs.com/package/sharp>

## Tech

- JWT
- FileUpload
- AWS S3
- async/await
- React-Pose
- md5
- Material UI
- Concurrently
- Sharp, for creating thumbnails

## Animations

![Nav Gif](/readme/nav-trim.gif)

- Staggered roll in on nav
- Color changing section header
- Title changing section header
- Progress around button. Documentation issue?
  - <https://material-ui.com/components/progress/#interactive-integration>
  - `zIndex: 1,` vs `zIndex: -1,`

## Upload Button

![Upload Gif](/readme/upshort.gif)

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

## Validation

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

## Responsive

- Login / Signup modal goes full screen on mobile view
- Nav bar hides active page
- Profile Dropdown with Username

## Draft Management

- Create new draft
- Update draft
- Delete draft
- Submit draft

## Progressive Image Loading

Progressive can be one of two things:

- A real method of encoding an image where the data loads in over the whole area instead of top to bottom. What you get is an image that starts off pixelate and gets more detail as it loads, vs empty space that slowly fills in from the top
- A fake version of the above, using thumbnails and blur

### Steps

- Generate a super small super low res thumbnail of the image (like 20px by 20px)
- Load that small image and toss a CSS blur on it
- Load the full res image in the background
- When its loaded, switch it out with the low res one, and transition the CSS blur away

## Next Steps

### :skull: Skeleton Loader

The (typically) grey place holder before some content has loaded enough to start displaying.
