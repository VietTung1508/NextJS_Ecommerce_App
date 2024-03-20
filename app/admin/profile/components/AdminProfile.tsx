"use client";

import React, { useState } from "react";
import "./AdminProfile.scss";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { loginStart, loginSuccess, logout } from "@/store/features/adminSlice";
import axios from "axios";

const AdminProfile = () => {
  const admin: any = useAppSelector((state) => state.admin.admin);

  const [inpValue, setInpValue] = useState({
    email: admin && admin?.email,
  });

  const dispatch = useAppDispatch();
  const route = useRouter();

  const handleEditProfile = async (e: any) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`/api/editAdmin`, {
        ...inpValue,
        id: admin && admin.id,
      });
      dispatch(logout());
      dispatch(loginSuccess({ admin: res.data, token: res.data.accessToken }));
      route.push("/admin");
    } catch (e) {
      console.log(e);
    }
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    setInpValue({
      ...inpValue,
      email: admin && admin.email,
    });
  };

  const handleValue = (e: any) => {
    setInpValue({ ...inpValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-setting">
      <h1>Admin Profile</h1>
      <div className="profile-setting-img">
        <h5>Avatar</h5>
        <div className="setting-img-wrapper">
          <img src={admin && admin.image} />
        </div>
      </div>
      <form className="profile-setting-info" onSubmit={handleEditProfile}>
        <div className="profile-setting-email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={inpValue.email}
            onChange={handleValue}
            required
          />
        </div>
        <div className="profile-setting-actions">
          <button className="btn-reset" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-save" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
