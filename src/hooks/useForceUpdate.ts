/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useState } from "react";
import useFirstTime from "./useFirstTime";

export function useForceUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick((tick) => tick + 1);
    }, []);
    return update;
}

export const useForceUpdateConstraint = (constraint: any) => {
    const [isUpdate, setUpdate] = useState(true);
    const isFirstTime = useFirstTime();

    useEffect(() => {
        if (isFirstTime) return;
        setUpdate(false);
    }, [constraint]);

    useEffect(() => {
        !isUpdate && setUpdate(true);
    }, [isUpdate]);

    return isUpdate;
};

export default useForceUpdate;
