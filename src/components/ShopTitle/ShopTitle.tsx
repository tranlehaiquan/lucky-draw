import React from 'react';

interface Props {
  className?: string;
};

const ShopTitle: React.FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-white uppercase font-bold text-center">
      <p>Tên</p>
      {/* <p>Mã Gian Hàng</p> */}
      <p>SĐT</p>
    </div>
  );
}

export default ShopTitle;