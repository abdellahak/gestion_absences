import { useState } from "react";
import { LuSettings2 } from "react-icons/lu";

const TIME_SLOTS = [
  { label: "08:30 - 10:30", value: "8:30-10:30" },
  { label: "10:30 - 13:30", value: "10:30-13:30" },
  { label: "13:00 - 16:00", value: "13:00-16:00" },
  { label: "16:00 - 18:30", value: "16:00-18:30" },
];

export default function TimeSlotSelector({ 
  selectedTime, 
  setSelectedTime,
  showOther, 
  setShowOther,
  otherDebut,
  setOtherDebut,
  otherFin,
  setOtherFin,
  errors
}) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Sélectionner le créneau horaire
      </label>
      <div className="flex flex-wrap gap-4 items-center">
        {TIME_SLOTS.map((slot) => (
          <label
            key={slot.value}
            className={
              "flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition " +
              (!showOther && selectedTime === slot.value
                ? "bg-brand-500 text-white border-brand-500 shadow"
                : "bg-white border-gray-300 hover:border-brand-400")
            }
          >
            <input
              type="radio"
              name="time_slot"
              value={slot.value}
              checked={!showOther && selectedTime === slot.value}
              onChange={() => {
                setShowOther(false);
                setSelectedTime(slot.value);
              }}
              className="hidden"
            />
            {slot.label}
          </label>
        ))}
        <button
          type="button"
          className={
            "flex items-center gap-2 px-4 py-2 rounded-lg border transition " +
            (showOther
              ? "bg-brand-500 text-white border-brand-500 shadow"
              : "bg-white border-gray-300 hover:border-brand-400")
          }
          onClick={() => {
            setShowOther((prev) => !prev);
            setSelectedTime("");
          }}
        >
          <LuSettings2 />
          Autre
        </button>
      </div>
      {showOther && (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Heure début
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-sm transition"
              value={otherDebut}
              onChange={(e) => setOtherDebut(e.target.value)}
              required={showOther}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Heure fin
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-sm transition"
              value={otherFin}
              onChange={(e) => setOtherFin(e.target.value)}
              required={showOther}
            />
          </div>
        </div>
      )}
      <p className="text-red-500 text-md break-words h-[20px]">
        {errors.heure_debut || errors.heure_fin}
      </p>
    </div>
  );
}