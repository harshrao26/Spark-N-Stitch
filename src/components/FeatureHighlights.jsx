import React from 'react';
import {
  FaTruck,
  FaPhoneAlt,
  FaBoxOpen,
  FaSmile,
  FaTags,
} from 'react-icons/fa';

const features = [
  {
    icon: <FaTruck size={24} />,
    title: 'Fast Delivery',
    desc: 'Lorem ipsum dolor sit amet, consectetur elit',
  },
  {
    icon: <FaPhoneAlt size={24} />,
    title: '24/7 Call Support',
    desc: 'Lorem ipsum dolor sit amet, consectetur elit',
  },
  {
    icon: <FaBoxOpen size={24} />,
    title: 'Quality Products',
    desc: 'Lorem ipsum dolor sit amet, consectetur elit',
  },
  {
    icon: <FaSmile size={24} />,
    title: 'Happy Customer',
    desc: 'Lorem ipsum dolor sit amet, consectetur elit',
  },
  {
    icon: <FaTags size={24} />,
    title: 'Up To 20% Off',
    desc: 'Lorem ipsum dolor sit amet, consectetur elit',
  },
];

const FeatureHighlights = () => (
  <section className="py-8 max-w-7xl px-6 mx-auto bg-white bord er rounded-lg shadow-sm">
    <div className="flex flex-wrap justify-between items-center gap-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3 w-52">
          <div className="text-pink-500 mt-1">{feature.icon}</div>
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">{feature.title}</h4>
            <p className="text-xs text-gray-500">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureHighlights;
