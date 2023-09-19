import { useEffect, useState } from "react";

export default function SvgIcon(props: { name: string; size?: number; className?: string }) {
  const [eId, setEId] = useState("icon-");
  const size = props.size || 16;

  useEffect(() => {
    const id = `icon-${props.name}`;
    setEId(`#${id}`);
    const container = document.getElementById("__ICONSVG_CONTAINER__")!;
    const svgIconList: Set<string> =
      (window as any).svgIconList || ((window as any).svgIconList = new Set());
    if (!svgIconList.has(id)) {
      svgIconList.add(id);
      // remove `?raw` for rollup building
      import(`../assets/svg/${props.name}.svg?raw`)
        .then((res) => {
          const svgElement = new DOMParser()
            .parseFromString(res.default, "image/svg+xml")
            .querySelector("svg");
          if (svgElement) {
            ["width", "height", "x", "y"].forEach((key) => {
              svgElement.removeAttribute(key);
            });
            svgElement.id = id;
            container.appendChild(svgElement);
          }
        })
        .catch((reason) => {
          svgIconList.delete(id);
          console.error("icon-svg load err: ", reason);
          setEId("#icon-");
        });
    }
  }, [props.name]);
  return (
    <svg
      className={props.className}
      style={{
        width: size + "px",
        height: size + "px",
      }}
    >
      <use href={eId} />
    </svg>
  );
}
