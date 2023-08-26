// eslint-disable-next-line import/prefer-default-export
export const ATTRIBUTE_INPUT_TYPE = [
  {
    id: "dropdown",
    label: "dropdown",
    iconName: "person",
    subObject: {
      name: "Test",
      id: "test",
      children: {
        name: "children",
        id: "children",
      },
    },
    subMenu: [
      {
        id: "color",
        label: "swatchColor",
        subMenu: [
          { id: "text", label: "swatchText" },
          { id: "image", label: "swatchImage" },
          { id: "color", label: "swatchColor" },
          { id: "color", label: "swatchColor" },
        ],
      },
      { id: "color", label: "swatchColor" },
      { id: "color", label: "swatchColor" },
      { id: "color", label: "swatchColor" },
      { id: "color", label: "swatchColor" },
    ],
  },
  { id: "text", label: "swatchText " },
  { id: "image", label: "swatchImage" },
  { id: "color", label: "swatchColor" },
  { id: "theme", label: "swatchTheme" },
  { id: "size", label: "swatchSize" },
  { id: "thin", label: "swatchThin" },
  { id: "fat", label: "swatchFat" },
];

export const SELECT_DATA = [
  { id: "text", label: "swatchText" },
  { id: "image", label: "swatchImage" },
  { id: "color", label: "swatchColor" },
  { id: "color1", label: "swatchTheme" },
  { id: "color2", label: "swatchSize" },
  { id: "color3", label: "swatchColor" },
  { id: "color4", label: "swatchFat" },
  { id: "color5", label: "swatchThin" },
  { id: "color6", label: "swatchColor" },
  { id: "color7", label: "swatchColor" },
  { id: "color8", label: "swatchColor" },
  { id: "color9", label: "swatchColor" },
  { id: "color10", label: "swatchColor" },
  { id: "color11", label: "swatchColor" },
];

export const DELIVERY_STATUS_LIST = [
  {
    id: "pending",
    value: "pending",
    label: "pendingName",
    color: "#FFBD59 ",
  },

  { id: "reject", value: "reject", label: "rejected", color: "#EB5757" },

  {
    id: "confirm",
    value: "confirm",
    label: "confirmed",
    color: "#33B950",
  },
  {
    id: "cancelled",
    value: "cancelled",
    label: "cancelled",
    color: "#8D8D8D",
  },
];
