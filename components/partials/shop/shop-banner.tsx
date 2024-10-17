import React from 'react';

interface ShopBannerProps {
    subTitle?: string;
    title?: string;
    current?: string;
}

const ShopBanner: React.FC<ShopBannerProps> = ({ subTitle = '42 Products', title = "Riode Shop", current = "Riode Shop" }) => {
    return (
        <div className="page-header shop" style={{ backgroundImage: `url(./images/home/page-header.jpg)`, backgroundColor: "#E4EAEA" }}>
            {title && <h1 className="page-title text-dark ls-m font-weight-bold mb-2">{title}</h1>}
            {subTitle && <h3 className="page-subtitle text-uppercase text-body">{subTitle}</h3>}
        </div>
    );
};

export default ShopBanner;
