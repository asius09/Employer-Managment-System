import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "../../Context/ThemeContext";

export default function DatePicker({
  value,
  onChange,
  invalid,
  label,
  icon,
  readOnly = false,
}) {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: { main: "#615eff" },
      text: {
        primary: theme === "dark" ? "#F9FAFB" : "#1F2937",
        secondary: theme === "dark" ? "#D1D5DB" : "#4B5563",
      },
      background: {
        paper: theme === "dark" ? "#1F2937" : "#FFFFFF",
        default: theme === "dark" ? "#111827" : "#F9FAFB",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: invalid ? "#EF4444" : "#615eff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: invalid ? "#EF4444" : "#615eff",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "0.375rem",
              borderColor: invalid
                ? "#EF4444"
                : theme === "dark"
                ? "#45556b"
                : "#cad6e3",
              borderWidth: "1px",
            },
          },
          input: {
            color: theme === "dark" ? "#F9FAFB" : "#1F2937",
            padding: "0.75rem",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme === "dark" ? "#D1D5DB" : "#4B5563",
            "&.Mui-focused": { color: invalid ? "#EF4444" : "#615eff" },
          },
        },
      },
      MuiPickersDay: {
        styleOverrides: {
          root: { borderRadius: "0.375rem" },
        },
      },
    },
  });

  return (
    <div className="space-y-2">
      {label && (
        <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
          {icon && <i className={`${icon} text-lg`}></i>}
          {label}
        </label>
      )}
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiDatePicker
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            sx={{
              width: "100%",
              "& .MuiPickersDay-root": {
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
                "&:hover": {
                  backgroundColor: "#615eff",
                  color: theme === "dark" ? "#1F2937" : "#FFFFFF",
                },
                "&.Mui-selected": {
                  backgroundColor: "#615eff",
                  color: theme === "dark" ? "#1F2937" : "#FFFFFF",
                  "&:hover": { backgroundColor: "#4338CA" },
                },
              },
              "& .MuiPickersDay-today": { borderColor: "#615eff" },
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
