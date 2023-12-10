import { memo } from "react";

function ProductInfo({renderItem, item}) {
  return (
    <>
    {!!item && renderItem(item)}
    </>
  )
}

ProductInfo.defaultProps = {
  renderItem: (item) => {},
}

export default memo(ProductInfo);