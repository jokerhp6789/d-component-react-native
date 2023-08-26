import { useEffect, EffectCallback, DependencyList, useRef } from "react";
import _ from "lodash";

function deepCompareEquals(a: any, b: any) {
  // TODO: implement deep comparison here
  // something like lodash
  return _.isEqual(a, b);
}

export function useDeepCompareMemoize(value: any) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(
  effect: EffectCallback,
  deps: DependencyList
): void {
  useEffect(effect, deps.map(useDeepCompareMemoize));
}

export default useDeepCompareEffect;
