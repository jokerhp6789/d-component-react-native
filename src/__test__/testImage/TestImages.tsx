import React, { useState } from "react";
import Image from "../../component/image/Image";
import ImageCarousel from "../../component/image/ImageCarousel";
import ImageList from "../../component/image/ImageList";
import ImageViewerModal from "../../component/image/ImageViewerModal";
import ScrollView from "../../component/view/ScrollView";
import TouchableOpacity from "../../component/view/TouchableOpacity";
import View from "../../component/view/View";
import images from "./Images";

export interface ITestImagesProps {
  [key: string]: any;
}

const IMAGES = [
  {
    url: "https://vcdn-vnexpress.vnecdn.net/2021/09/24/A-nh-chu-p-Ma-n-hi-nh-2021-09-1489-2655-1632443165.png",
  },
  {
    url: "https://vcdn-thethao.vnecdn.net/2021/10/08/244414385-390096059250424-6630-4489-6893-1633636795.jpg",
  },
  {
    url: "https://vcdn-vnexpress.vnecdn.net/2021/09/24/A-nh-chu-p-Ma-n-hi-nh-2021-09-1489-2655-1632443165.png",
  },
];

const TestImages: React.FC<ITestImagesProps> = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <ScrollView className="w-100">
      <View className="flex-1">
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Image
            source={images.afternoon}
            resizeMode="contain"
            className="my-2 image-square-x-small"
          />
        </TouchableOpacity>
        <Image
          source={images.afternoon}
          resizeMode="contain"
          className="imy-2 image-square-small"
        />
        <Image
          source={images.afternoon}
          resizeMode="contain"
          className="my-2 image-square-medium"
        />
        <Image
          source={images.afternoon}
          resizeMode="contain"
          className="my-2 image-square-large"
        />
        <Image
          source={images.afternoon}
          resizeMode="contain"
          className="my-2 image-square-x-large"
        />
        <Image
          source={images.afternoon}
          resizeMode="contain"
          className="image-square-xx-large"
        />
        <ImageViewerModal
          open={openModal}
          value={[
            {
              url: "https://vcdn-vnexpress.vnecdn.net/2021/09/24/A-nh-chu-p-Ma-n-hi-nh-2021-09-1489-2655-1632443165.png",
            },
          ]}
          onClose={() => setOpenModal(false)}
        />
        <ImageList
          dataSource={IMAGES}
          getSource={({ item }) => item?.url}
          size="xx-large"
        />
        <ImageCarousel data={IMAGES} />
      </View>
    </ScrollView>
  );
};

export default TestImages;
