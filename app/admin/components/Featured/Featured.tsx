"use client";
import React from "react";
import { IoMdMore, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {} from "react-icons/io";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Revenue</h1>
        <IoMdMore />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text="70%" strokeWidth={4} />
        </div>
        <p className="title">Revenue Today</p>
        <p className="amount">1.200.000 đ</p>
        <p className="desc">
          Process the previous transaction. The final payments may not be
          included
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <IoIosArrowUp />
              <div className="resultAmount">20.000.000 đ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <IoIosArrowUp />
              <div className="resultAmount ">32.000.000 đ</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult negative">
              <IoIosArrowDown />
              <div className="resultAmount ">12.000.000 đ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
