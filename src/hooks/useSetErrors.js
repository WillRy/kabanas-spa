import { useEffect } from "react";
import { processErrors } from "../utils/helpers.js";

export function useSetErrors(error, setError, customFieldMap = []) {
  useEffect(() => {
    const fieldErrors = processErrors(error?.data?.errors || {});

    for (const field in fieldErrors) {
      let targetField;

      if (customFieldMap instanceof Map) {
        targetField = customFieldMap.get(field);
      } else if (Array.isArray(customFieldMap)) {
        // support array of pairs: [['startDate', 'period'], ...]
        const pair = customFieldMap.find(p => Array.isArray(p) && p[0] === field);
        if (pair) targetField = pair[1];
      } else if (customFieldMap && typeof customFieldMap === "object") {
        // support object map: { startDate: 'period', ... }
        targetField = customFieldMap[field];
      }

      if (targetField) {
        setError(targetField, { type: "manual", message: fieldErrors[field] });
      } else {
        setError(field, { type: "manual", message: fieldErrors[field] });
      }
    }
  }, [error, setError, customFieldMap]);
}
