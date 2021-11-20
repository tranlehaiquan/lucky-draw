import React from 'react';

interface Props {
  className?: string;
};

const ShopTitle: React.FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-white uppercase font-bold text-center">
      <p>Tên Gian Hàng</p>
      <p>Mã Gian Hàng</p>
      <p>Số Điện Thoại</p>
    </div>
  );
}

export default ShopTitle;