import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  // useEffect, 当pathname或search，也就是上面const的location或者查询参数变化时，window滚动到顶端
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}
