import ImageUploading from "react-images-uploading";
import { Divider, Button, Stack, Box } from "@mui/material";

export default function ImageUpload({ images, setImages }) {
  const maxNumber = 10;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
      acceptType={["jpg"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div>
          <Button
            sx={{
              mr: 2,
            }}
            variant="contained"
            style={isDragging ? { color: "red" } : null}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </Button>

          <Button variant="contained" onClick={onImageRemoveAll}>
            Remove all images
          </Button>
          <Stack
            direction="column"
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            {imageList.map((image, index) => (
              <div key={index}>
                <Box
                  sx={{
                    my: 2,
                    height: "200px",
                  }}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                    }}
                    src={image.data_url}
                    alt=""
                    width="100"
                  />
                </Box>

                <div>
                  <Button
                    sx={{
                      mr: 2,
                    }}
                    variant="contained"
                    onClick={() => onImageUpdate(index)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </Stack>
        </div>
      )}
    </ImageUploading>
  );
}
