import _ from "lodash";
import StringUtils from "../../../utils/StringUtils";
import TimeUtils from "../../../utils/TimeUtils";

export interface ISectionItem {
  id: any;
  title: any;
  data: Array<any>;
}

export const isObject = (object: any) => {
  return typeof object === "object";
};

export const isArray = (array: any) => {
  return Array.isArray(array);
};

export const isString = (variable: any) => {
  return typeof variable === "string";
};

export function mapListToSectionData<T extends Object>({
  dataArr = [],
  //@ts-ignore
  getValue = (item) => item?.created,
  getTitle = ({ value }) =>
    value ? TimeUtils.convertMiliToDateTime(value) : "N/A",
  option = {},
}: {
  dataArr: Array<T>;
  getValue: (props: T) => any;
  getTitle: (props: { value: any; option: any; [key: string]: any }) => any;
  option: any;
}): ISectionItem[] {
  if (_.isEmpty(dataArr)) {
    return [];
  }
  let newTitle = "";
  let currentTitle = "";
  const sections: ISectionItem[] = _.reduce(
    dataArr,
    (result: Array<any>, day: T) => {
      newTitle = getTitle({
        value: getValue(day),
        option,
      });
      if (currentTitle !== newTitle) {
        currentTitle = newTitle;
        result.push({
          title: newTitle,
          id: StringUtils.getUniqueID(),
          data: [day],
        });
      } else {
        result[result.length - 1].data.push(day);
      }
      return result;
    },
    []
  );

  return sections;
}
