import React from "react";
import Avatar from "../../component/avatar/Avatar";
import View from "../../component/view/View";
import images from "../testImage/Images";
import AvatarName from "../../component/avatar/AvatarName";
import ScrollView from "../../component/view/ScrollView";

export interface ITestAvatarProps {
  [key: string]: any;
}

const TestAvatar: React.FC<ITestAvatarProps> = ({ id }) => {
  const imageType = typeof images.birthdayCake;
  console.log({ imageType });
  return (
    <ScrollView className="w-100">
      <View>
        <Avatar
          text="T"
          size="xx-small"
          className="my-2"
          showBorder
          borderColor="blue"
        />
        <Avatar text="T" size="x-small" className="my-2" />
        <Avatar text="T" size="small" className="my-2" />
        <Avatar text="T" size="medium" className="my-2" />
        <Avatar text="T" size="large" className="my-2" />
        <Avatar text="T" size="x-large" className="my-2" />
        <Avatar text="T" size="xx-large" className="my-2" />
      </View>
      <View>
        <Avatar
          avatar={images.birthdayCake}
          size="xx-small"
          className="my-2"
          variant="rounded"
        />
        <Avatar avatar={images.birthdayCake} size="x-small" className="my-2" />
        <Avatar avatar={images.birthdayCake} size="small" className="my-2" />
        <Avatar avatar={images.birthdayCake} size="medium" className="my-2" />
        <Avatar avatar={images.birthdayCake} size="large" className="my-2" />
        <Avatar avatar={images.birthdayCake} size="x-large" className="my-2" />
        <Avatar
          avatar={images.birthdayCake}
          size="xx-large"
          className="my-2"
          variant="rounded"
        />
      </View>
      <View>
        <AvatarName
          user={{ fullName: "Trung", avatar: images.birthdayCake }}
          size="xx-small"
          className="my-2"
          color="primary"
          colorDarkMode="warnColor"
        />
        <AvatarName
          user={{ fullName: "Trung", avatar: images.birthdayCake }}
          size="x-small"
          className="my-2"
          subLabel="Culi"
        />
        <AvatarName
          user={{ fullName: "Trung", avatar: images.birthdayCake }}
          size="small"
          className="my-2"
          color="primary"
          subLabel="Culi"
        />
        <AvatarName
          user={{
            fullName: "Trung",
            avatar: {
              uri: "https://vcdn-vnexpress.vnecdn.net/2021/09/24/A-nh-chu-p-Ma-n-hi-nh-2021-09-1489-2655-1632443165.png",
            },
            // avatar:
            //   "https://vcdn-vnexpress.vnecdn.net/2021/09/24/A-nh-chu-p-Ma-n-hi-nh-2021-09-1489-2655-1632443165.png",
          }}
          size="medium"
          className="my-2"
        />
        <AvatarName
          user={{ fullName: "Trung", avatar: images.birthdayCake }}
          size="large"
          className="my-2"
        />
        <AvatarName
          user={{ fullName: "Trung", avatar: images.birthdayCake }}
          size="x-large"
          className="my-2"
        />
        <AvatarName
          user={{ fullName: "Trung", avatar: images.birthdayCake }}
          size="xx-large"
          className="my-2"
        />
      </View>
    </ScrollView>
  );
};

export default TestAvatar;
