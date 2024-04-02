import { Card, CardBody, Center, Image, Text } from "@chakra-ui/react";

export function MainPage() {
  return (
    <Center mt="0%">
      <Card>
        <CardBody>
          <Image
            w="sm"
            height="sm"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJYIpe1NAJI16PXDkZTt8tiebkI2dDCn4XV7djOeWVkg&s"
          />
          <Text>Name: Monke</Text>
          <Text>Age: 18</Text>
          <Text>Des: Hey yo ma name is monke</Text>
          <Text>City: Africa</Text>
          <Text>Away from: 5km</Text>
          <Text>Interests: SSPS</Text>
          <Text>Socials(optional): monke_1</Text>
        </CardBody>
      </Card>
    </Center>
  );
}
