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

const readStoredUser = () => {
  const raw = localStorage.getItem("lms_user");
  return raw ? JSON.parse(raw) : null;
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
