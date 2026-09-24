import { createContext, useMemo, useState } from "react";

const DEFAULT_TEACHERS = [
  {
    id: "admin-teacher",
    fullName: "Admin Teacher",
    phoneNumber: "0710000001",
    role: "teacher",
    isAdmin: true,
    canPublish: true
  }
];

const DEFAULT_USER = {
  id: 1,
  fullName: "Madhuwantha",
  email: "madhudissa07@gmail.com",
  phoneNumber: "0771234567",
  role: "student",
  school: "Royal College Colombo",
  nicNumber: "200412345678",
  academicYear: "A/L 2026",
  district: "Colombo",
  parentPhone: "0719876543",
  profilePic: "",
  bio: "Advanced Level Physics Student specializing in Quantum Mechanics & Electromagnetism."
};

const readStoredUser = () => {
  const raw = localStorage.getItem("lms_user");
  return raw ? JSON.parse(raw) : DEFAULT_USER;
};

const readStoredTeachers = () => {
  const raw = localStorage.getItem("lms_teachers");
  return raw ? JSON.parse(raw) : DEFAULT_TEACHERS;
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(readStoredUser);
  const [teachers, setTeachers] = useState(readStoredTeachers);

  const setUser = (nextUser) => {
    setUserState(nextUser);

    if (nextUser) {
      localStorage.setItem("lms_user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("lms_user");
    }
  };

  const updateUserProfile = async (updatedData) => {
    const mergedUser = { ...user, ...updatedData };
    setUser(mergedUser);

    try {
      // Sync with Neon PostgreSQL Backend API
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user?.id,
          email: user?.email,
          ...updatedData
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser({ ...mergedUser, ...data.user });
          return { ok: true, message: data.message || "Profile updated in database!" };
        }
      }
    } catch (err) {
      console.warn("Backend database sync notice:", err);
    }

    return { ok: true, message: "Profile updated successfully!" };
  };

  const setTeacherDirectory = (nextTeachers) => {
    setTeachers(nextTeachers);
    localStorage.setItem("lms_teachers", JSON.stringify(nextTeachers));
  };

  const loginTeacher = (phoneNumber) => {
    const teacher = teachers.find((item) => item.phoneNumber === phoneNumber);

    if (!teacher) {
      return { ok: false, message: "Admin-teacher account not found." };
    }

    setUser(teacher);
    return { ok: true, user: teacher };
  };

  const approveTeacherPublishing = (teacherId) => {
    if (!user?.isAdmin) {
      return;
    }

    const nextTeachers = teachers.map((teacher) =>
      teacher.id === teacherId ? { ...teacher, canPublish: true } : teacher
    );

    setTeacherDirectory(nextTeachers);

    if (user?.id === teacherId) {
      const updatedTeacher = nextTeachers.find((teacher) => teacher.id === teacherId);
      setUser(updatedTeacher);
    }
  };

  const revokeTeacherPublishing = (teacherId) => {
    if (!user?.isAdmin) {
      return;
    }

    const nextTeachers = teachers.map((teacher) =>
      teacher.id === teacherId ? { ...teacher, canPublish: false } : teacher
    );

    setTeacherDirectory(nextTeachers);

    if (user?.id === teacherId) {
      const updatedTeacher = nextTeachers.find((teacher) => teacher.id === teacherId);
      setUser(updatedTeacher);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      updateUserProfile,
      logout,
      teachers,
      loginTeacher,
      approveTeacherPublishing,
      revokeTeacherPublishing
    }),
    [teachers, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
