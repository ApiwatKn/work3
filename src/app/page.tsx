"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 4. สร้าง Zod Schema
const schema = z.object({
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  dob: z.string().refine((val) => /^(\d{2})\/(\d{2})\/(\d{4})$/.test(val), {
    message: "กรุณากรอกวันเกิดในรูปแบบที่ถูกต้อง (DD/MM/YYYY)",
  }),
  gender: z.enum(["ชาย", "หญิง", "อื่น ๆ"], {
    errorMap: () => ({ message: "กรุณาเลือกเพศที่ถูกต้อง" }),
  }),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z
    .string()
    .min(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก")
    .max(10, "เบอร์โทรศัพท์ต้องมี 10 หลัก")
    .regex(/^\d+$/, "เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น"),
});

// 5. ใช้ react-hook-form
export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log("ข้อมูลที่บันทึก:", data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
          <input
            {...register("firstName")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">นามสกุล</label>
          <input
            {...register("lastName")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">วัน/เดือน/ปีเกิด</label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            {...register("dob")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm">{errors.dob?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">เพศ</label>
          <select
            {...register("gender")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">-- เลือกเพศ --</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">อีเมล</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            {...register("phone")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          บันทึก
        </button>
      </form>
    </div>
  );
}