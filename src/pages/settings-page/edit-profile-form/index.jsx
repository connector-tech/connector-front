import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useUploadPhoto } from "../../../api/users/users-hooks";
import EditForm from "./edit-form";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function EditProfileForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreviews, setImagesPreview] = useState([]);
  const { mutate } = useUploadPhoto();
  const formData = new FormData();
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setImages([]);
    setImagesPreview([]);
    setIsOpen(false);
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    setImages([...images, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreview([...imagesPreviews, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = () => {
    images.forEach((file, index) => {
      formData.append(`images`, file);
    });
    mutate({
      photos: formData.get("images"),
    });
  };

  const onSaveChanges = (info) => {};

  return (
    <>
      <Button onClick={onOpen}>Edit profile</Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="full">
        <DrawerContent>
          <DrawerBody>
            <Button onClick={onClose} bg="transparent">
              <Icon as={ArrowLeftIcon} />
              <Text fontWeight="500" ml="5">
                Back
              </Text>
            </Button>
            <EditForm />

            <Box mb="40">
              <Button onClick={onSubmit} mt="5">
                Upload photos
              </Button>
              <Input
                type="file"
                accept="image/*"
                onChange={onUpload}
                border="none"
                mt="5"
              />
              {imagesPreviews.length !== 0 && (
                <Splide aria-label="My Favorite Images">
                  {imagesPreviews.map((item) => {
                    return (
                      <SplideSlide>
                        <Image src={item} key={item} w="auto" />
                      </SplideSlide>
                    );
                  })}
                </Splide>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
