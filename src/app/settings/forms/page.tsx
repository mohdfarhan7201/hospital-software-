"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { PageHeader } from "@/components/common/PageHeader";
import { toast } from "sonner";
import { FormInput, Plus, Trash2, Save, GripVertical, CheckCircle2, FileText } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "checkbox" | "textarea";
  required: boolean;
  options?: string[];
}

interface CustomForm {
  id: string;
  title: string;
  module: string;
  description: string;
  fields: FormField[];
}

const INITIAL_FORMS: CustomForm[] = [
  {
    id: "1",
    title: "Pre-Anesthetic Evaluation Questionnaire",
    module: "Operation Theatre",
    description: "Screening checklist completed before elective surgical intervention",
    fields: [
      { id: "f1", label: "History of Previous Anesthesia Complications", type: "select", required: true, options: ["No", "Yes (Malignant Hyperthermia)", "Yes (Difficult Intubation)", "Yes (Delayed Awakening)"] },
      { id: "f2", label: "Mallampati Airway Score", type: "select", required: true, options: ["Class I", "Class II", "Class III", "Class IV"] },
      { id: "f3", label: "Last Solid Meal Intake Time", type: "text", required: true },
      { id: "f4", label: "Known Drug Allergic Sensitivities", type: "textarea", required: false },
    ],
  },
  {
    id: "2",
    title: "Inpatient Fall Risk Assessment (Morse Scale)",
    module: "Nursing & Wards",
    description: "Standardized nursing evaluation for elderly or sedated patients",
    fields: [
      { id: "m1", label: "History of Falling in Last 3 Months", type: "select", required: true, options: ["No (0 pts)", "Yes (25 pts)"] },
      { id: "m2", label: "Secondary Medical Diagnosis", type: "select", required: true, options: ["No (0 pts)", "Yes (15 pts)"] },
      { id: "m3", label: "Ambulatory Aid Used", type: "select", required: true, options: ["None / Bedrest (0 pts)", "Crutches / Cane / Walker (15 pts)", "Furniture Clutched (30 pts)"] },
      { id: "m4", label: "Mental Status", type: "select", required: true, options: ["Oriented to own ability (0 pts)", "Overestimates / Forgets limits (15 pts)"] },
    ],
  },
];

export default function FormBuilderPage() {
  const [forms, setForms] = useState<CustomForm[]>(INITIAL_FORMS);
  const [selectedFormId, setSelectedFormId] = useState<string>("1");

  const activeForm = forms.find(f => f.id === selectedFormId) || forms[0];

  const handleAddField = () => {
    const newField: FormField = {
      id: `f_${Date.now()}`,
      label: "New Form Field",
      type: "text",
      required: false,
    };
    setForms(forms.map(f => f.id === selectedFormId ? { ...f, fields: [...f.fields, newField] } : f));
    toast.success("Field added to form builder");
  };

  const handleRemoveField = (fieldId: string) => {
    setForms(forms.map(f => f.id === selectedFormId ? { ...f, fields: f.fields.filter(x => x.id !== fieldId) } : f));
    toast.info("Field removed");
  };

  const handleSaveForm = () => {
    toast.success(`Custom clinical form "${activeForm.title}" saved and published`);
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Dynamic Healthcare Form Builder"
        description="Design customized clinical assessment questionnaires, nursing intake flowsheets, consent forms, and departmental audit checklists"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings", href: "/settings/hospital" },
          { label: "Form Builder" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddField}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--background)] flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add Input Field
            </button>
            <button
              onClick={handleSaveForm}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Publish Form
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Selector List */}
        <div className="lg:col-span-1 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
            Clinical Questionnaires
          </h3>
          {forms.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFormId(f.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedFormId === f.id
                  ? "bg-[var(--card)] border-[var(--primary)] shadow-sm ring-1 ring-[var(--primary)]"
                  : "bg-[var(--card)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)]"
              }`}
            >
              <div className="font-bold text-xs text-[var(--foreground)]">{f.title}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{f.module} • {f.fields.length} Fields</div>
            </button>
          ))}
        </div>

        {/* Dynamic Builder Canvas */}
        <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm text-xs space-y-4">
          <div className="pb-3 border-b border-[var(--border)]">
            <h3 className="text-base font-bold text-[var(--foreground)]">{activeForm.title}</h3>
            <p className="text-xs text-[var(--muted-foreground)]">{activeForm.description}</p>
          </div>

          <div className="space-y-3">
            {activeForm.fields.map((field, idx) => (
              <div key={field.id} className="p-3.5 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 mt-2 text-[var(--muted-foreground)] cursor-grab">
                  <GripVertical className="w-4 h-4" />
                  <span className="font-mono text-[11px]">#{idx + 1}</span>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Field Question / Label</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setForms(forms.map(f => f.id === selectedFormId ? {
                            ...f,
                            fields: f.fields.map(x => x.id === field.id ? { ...x, label: val } : x)
                          } : f));
                        }}
                        className="w-full px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--card)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Data Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setForms(forms.map(f => f.id === selectedFormId ? {
                            ...f,
                            fields: f.fields.map(x => x.id === field.id ? { ...x, type: val } : x)
                          } : f));
                        }}
                        className="w-full px-2.5 py-1.5 rounded border border-[var(--border)] bg-[var(--card)] focus:outline-none"
                      >
                        <option value="text">Single Line Text</option>
                        <option value="number">Numeric</option>
                        <option value="select">Dropdown Choice</option>
                        <option value="textarea">Multi-line Paragraph</option>
                        <option value="date">Date Picker</option>
                        <option value="checkbox">Yes / No Checkbox</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px]">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => {
                          const val = e.target.checked;
                          setForms(forms.map(f => f.id === selectedFormId ? {
                            ...f,
                            fields: f.fields.map(x => x.id === field.id ? { ...x, required: val } : x)
                          } : f));
                        }}
                        className="rounded text-[var(--primary)]"
                      />
                      <span className="font-medium">Mandatory Field</span>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveField(field.id)}
                  className="p-1.5 rounded hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/60 text-[var(--muted-foreground)] transition-colors mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
