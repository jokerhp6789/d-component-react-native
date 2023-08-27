const gapClass: any = {};
const gapRowClass: any = {};
const gapRowClassX: any = {};
const gapColClass: any = {};
const gapColClassY: any = {};
for (let i = 0; i <= 200; i += 1) {
    gapClass[`gap-${i}`] = {
        gap: i,
    };
    gapRowClass[`gap-row-${i}`] = {
        rowGap: i,
    };
    gapRowClassX[`gap-x-${i}`] = {
        rowGap: i,
    };
    gapColClass[`gap-col-${i}`] = {
        columnGap: i,
    };
    gapColClassY[`gap-y-${i}`] = {
        columnGap: i,
    };
}

const gapStyle = {
    ...gapClass,
    ...gapRowClass,
    ...gapRowClassX,
    ...gapColClass,
    ...gapColClassY,
};

export default gapStyle;
