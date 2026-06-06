"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import {
  TextInput,
  TextArea,
  CheckboxGroup,
  RadioGroup,
  ColorPicker,
  MultiColorPicker,
} from "@/components/brief/form-inputs";
import {
  IconBulb,
  IconPalette,
  IconCode,
  IconSquareCheck,
  IconClipboard,
  IconLayout,
  IconRocket,
} from "@/components/brief/icons";

interface FormData {
  // General info
  companyName: string;
  companyDescription: string;
  geography: string;
  currentSite: string;
  plannedSite: string;
  competitorSites: string;
  advantages: string;
  clientAcquisition: string;
  targetAudience: string;
  taskDescription: string;

  // Goals and functionality
  siteGoals: string[];
  siteType: string | null;
  modules: string[];
  cms: string | null;
  sections: string;

  // Design
  designApproach: string | null;
  designExamples: string;
  designElements: string[];
  designMood: string[];
  colorScheme: string;
  primaryColor: string;
  secondaryColor: string;
  selectedColors: string[];

  // Additional services
  additionalServices: string[];
  supportNeeded: string | null;
  supportDescription: string;

  // Custom inputs
  customInputs: Record<string, string>;
}

interface WebsiteBriefFormProps {
  onBack: () => void;
}

export function WebsiteBriefForm({ onBack }: WebsiteBriefFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyDescription: "",
    geography: "",
    currentSite: "",
    plannedSite: "",
    competitorSites: "",
    advantages: "",
    clientAcquisition: "",
    targetAudience: "",
    taskDescription: "",
    siteGoals: [],
    siteType: null,
    modules: [],
    cms: null,
    sections: "",
    designApproach: "unique",
    designExamples: "",
    designElements: [],
    designMood: [],
    colorScheme: "",
    primaryColor: "",
    secondaryColor: "",
    selectedColors: [],
    additionalServices: [],
    supportNeeded: null,
    supportDescription: "",
    customInputs: {},
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { title: "Общая информация", id: "general" },
    { title: "Цели и функционал", id: "goals" },
    { title: "Структура сайта", id: "structure" },
    { title: "Дизайн", id: "design" },
    { title: "Дополнительные услуги", id: "services" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Обязательное поле";
    }
    if (!formData.companyDescription.trim()) {
      newErrors.companyDescription = "Обязательное поле";
    }
    if (!formData.taskDescription.trim()) {
      newErrors.taskDescription = "Обязательное поле";
    }
    if (formData.siteGoals.length === 0) {
      newErrors.siteGoals = "Выберите хотя бы одну цель";
    }
    if (!formData.siteType) {
      newErrors.siteType = "Выберите тип сайта";
    }
    if (!formData.designApproach) {
      newErrors.designApproach = "Выберите подход к дизайну";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would send the form data to your backend
      console.log("Form data:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center py-24"
      >
        <div className="max-w-md w-full mx-auto text-center">
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </m.div>

          <h2 className="text-3xl font-bold mb-4 text-foreground">Спасибо!</h2>
          <p className="text-muted-foreground mb-8">
            Ваш бриф успешно отправлен. Мы свяжемся с вами в течение 15 минут для уточнения деталей.
          </p>

          <m.button
            onClick={onBack}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-hover transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Вернуться на главную
          </m.button>
        </div>
      </m.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <m.button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors mb-6"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Выбрать другую услугу</span>
            </m.button>

            <h1
              className="text-5xl font-black text-foreground mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Бриф: Разработка сайтов
            </h1>
            <p className="text-lg text-muted-foreground">
              Заполните форму, чтобы мы лучше поняли ваши задачи. Это займет 10-15 минут.
            </p>
          </m.div>

          {/* Progress Steps */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between gap-2 lg:gap-4">
              {steps.map((step, index) => (
                <m.div key={step.id} className="flex items-center flex-1">
                  <m.button
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className="flex-1 flex flex-col items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all min-h-[140px]"
                    style={{
                      borderColor:
                        currentStep >= index ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
                      backgroundColor:
                        currentStep >= index ? "rgba(84, 154, 242, 0.08)" : "transparent",
                    }}
                    whileHover={{
                      borderColor: "rgb(84, 154, 242)",
                    }}
                  >
                    <m.div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
                      style={{
                        backgroundColor:
                          currentStep >= index ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.2)",
                        color: currentStep >= index ? "white" : "rgb(84, 154, 242)",
                      }}
                    >
                      {currentStep > index ? "✓" : index + 1}
                    </m.div>
                    <div className="hidden lg:block text-center">
                      <div className="text-xs font-semibold text-muted-foreground">
                        Шаг {index + 1}
                      </div>
                      <div className="text-sm font-semibold text-foreground">{step.title}</div>
                    </div>
                  </m.button>

                  {index < steps.length - 1 && (
                    <m.div
                      className="hidden lg:block h-1 flex-1 mx-2 rounded-full"
                      style={{
                        backgroundColor:
                          currentStep > index ? "rgb(84, 154, 242)" : "rgba(84, 154, 242, 0.1)",
                      }}
                    />
                  )}
                </m.div>
              ))}
            </div>
          </m.div>

          {/* Form Steps */}
          <m.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Step 0: General Information */}
            {currentStep === 0 && (
              <>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-lg border border-primary/20 flex items-start gap-3 mb-6 bg-gradient-to-r from-primary/5 to-transparent"
                >
                  <div className="text-primary flex-shrink-0 mt-0.5">
                    <IconBulb />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Подсказка: чем больше информации вы предоставите, тем точнее будет наша оценка и рекомендации
                  </p>
                </m.div>
                <div className="space-y-6">
                  <TextInput
                    label="Как называется Ваша компания?"
                    description="Полное или сокращенное название"
                    placeholder="Введите название компании"
                    value={formData.companyName}
                    onChange={(value) =>
                      setFormData({ ...formData, companyName: value })
                    }
                    required
                  />

                  <TextArea
                    label="Расскажите о себе: чем Вы занимаетесь?"
                    description="Напишите о сфере деятельности, основные направления и услуги"
                    placeholder="Мы занимаемся..."
                    value={formData.companyDescription}
                    onChange={(value) =>
                      setFormData({ ...formData, companyDescription: value })
                    }
                    rows={5}
                    required
                  />

                  <TextInput
                    label="География работы компании"
                    description="Города или регионы, где вы работаете"
                    placeholder="Москва, СПб, Казань"
                    value={formData.geography}
                    onChange={(value) =>
                      setFormData({ ...formData, geography: value })
                    }
                  />

                  <TextInput
                    label="Адрес текущего сайта"
                    description="Укажите адрес вашего текущего сайта (если есть)"
                    placeholder="https://example.ru"
                    value={formData.currentSite}
                    onChange={(value) =>
                      setFormData({ ...formData, currentSite: value })
                    }
                  />

                  <TextInput
                    label="Планируемый адрес сайта"
                    description="Желаемый адрес для нового сайта"
                    placeholder="Например, super-mega-site.ru"
                    value={formData.plannedSite}
                    onChange={(value) =>
                      setFormData({ ...formData, plannedSite: value })
                    }
                  />

                  <TextArea
                    label="Сайты Ваших основных конкурентов"
                    description="Перечислите ссылки на сайты конкурентов"
                    placeholder="https://competitor1.ru&#10;https://competitor2.ru"
                    value={formData.competitorSites}
                    onChange={(value) =>
                      setFormData({ ...formData, competitorSites: value })
                    }
                    rows={3}
                  />

                  <TextArea
                    label="В чем Ваше преимущество над конкурентами?"
                    description="Уникальные предложения, особенности, преимущества"
                    placeholder="Мы предлагаем..."
                    value={formData.advantages}
                    onChange={(value) =>
                      setFormData({ ...formData, advantages: value })
                    }
                    rows={3}
                  />

                  <TextInput
                    label="Как клиенты узнают о Вашей компании?"
                    description="Реклама, соцсети, рекомендации и т.д."
                    placeholder="Google, Instagram, рекомендации"
                    value={formData.clientAcquisition}
                    onChange={(value) =>
                      setFormData({ ...formData, clientAcquisition: value })
                    }
                  />

                  <TextArea
                    label="Ваша целевая аудитория?"
                    description="Пол, возраст, доход, интересы, особенности"
                    placeholder="Женщины 25-45 лет, доход выше среднего..."
                    value={formData.targetAudience}
                    onChange={(value) =>
                      setFormData({ ...formData, targetAudience: value })
                    }
                    rows={3}
                  />

                  <TextArea
                    label="Краткое описание задачи"
                    description="Что нужно сделать и какую потребность закрыть?"
                    placeholder="Нужен сайт-каталог с уникальным дизайном..."
                    value={formData.taskDescription}
                    onChange={(value) =>
                      setFormData({ ...formData, taskDescription: value })
                    }
                    rows={4}
                    required
                  />
                </div>
              </>
            )}

            {/* Step 1: Goals and Functionality */}
            {currentStep === 1 && (
              <>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-lg border border-primary/20 flex items-start gap-3 mb-6 bg-gradient-to-r from-primary/5 to-transparent"
                >
                  <div className="text-primary flex-shrink-0 mt-0.5">
                    <IconSquareCheck />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Совет: выбирайте только необходимые модули. Это поможет оптимизировать стоимость и время разработки
                  </p>
                </m.div>
                <CheckboxGroup
                  label="Какова цель создания сайта?"
                  description="Выберите одну или несколько целей"
                  options={[
                    { id: "attract-clients", label: "Привлечение клиентов" },
                    { id: "brand-awareness", label: "Повышение узнаваемости" },
                    {
                      id: "e-commerce",
                      label: "Продажа товаров и услуг через интернет",
                    },
                    { id: "promotions", label: "Информирование о проведении акций" },
                    { id: "news", label: "Размещение новостей компании" },
                    { id: "goal-other", label: "Другое", requiresInput: true },
                  ]}
                  selected={formData.siteGoals}
                  onChange={(value) =>
                    setFormData({ ...formData, siteGoals: value })
                  }
                  customInputs={formData.customInputs}
                  onCustomInputChange={(id, value) =>
                    setFormData({
                      ...formData,
                      customInputs: { ...formData.customInputs, [id]: value },
                    })
                  }
                  columns={2}
                  required
                />

                <RadioGroup
                  label="Выберите тип сайта"
                  description="Какой тип сайта вам нужен?"
                  options={[
                    { id: "corporate", label: "Корпоративный сайт" },
                    { id: "services", label: "Сайт услуг" },
                    { id: "catalog", label: "Сайт с каталогом" },
                    { id: "ecommerce", label: "Интернет-магазин" },
                    { id: "landing", label: "Лэндинг (одностраничный)" },
                    { id: "promo", label: "Сайт-визитка / Промо сайт" },
                  ]}
                  selected={formData.siteType}
                  onChange={(value) =>
                    setFormData({ ...formData, siteType: value })
                  }
                  columns={2}
                  required
                />

                <CheckboxGroup
                  label="Выберите модули для сайта"
                  description="Какие функции должны быть на сайте?"
                  options={[
                    { id: "catalog", label: "Каталог товаров / услуг" },
                    { id: "search", label: "Поиск по каталогу" },
                    { id: "filter", label: "Фильтрация товаров" },
                    { id: "sorting", label: "Сортировка товаров" },
                    { id: "payment", label: "Онлайн оплата" },
                    { id: "cart", label: "Корзина" },
                    { id: "map", label: "Интерактивная карта" },
                    { id: "reviews", label: "Отзывы / Комментарии" },
                    { id: "comparison", label: "Сравнение товаров" },
                    { id: "favorites", label: "Избранное" },
                    { id: "forms", label: "Формы обратной связи" },
                    { id: "auth", label: "Авторизация / Регистрация" },
                    { id: "module-other", label: "Другое", requiresInput: true },
                  ]}
                  selected={formData.modules}
                  onChange={(value) =>
                    setFormData({ ...formData, modules: value })
                  }
                  customInputs={formData.customInputs}
                  onCustomInputChange={(id, value) =>
                    setFormData({
                      ...formData,
                      customInputs: { ...formData.customInputs, [id]: value },
                    })
                  }
                  columns={2}
                />

                <RadioGroup
                  label="Нужна ли система управления сайтом (CMS)?"
                  options={[
                    {
                      id: "yes",
                      label: "Да, нужна",
                      subtext: "Возможность самостоятельно менять контент",
                    },
                    {
                      id: "no",
                      label: "Нет, не нужна",
                      subtext: "Статический сайт или управление через разработчика",
                    },
                    {
                      id: "undecided",
                      label: "Пока не определились",
                      subtext: "Поговорим на консультации",
                    },
                  ]}
                  selected={formData.cms}
                  onChange={(value) =>
                    setFormData({ ...formData, cms: value })
                  }
                  columns={1}
                />
              </>
            )}

            {/* Step 2: Structure */}
            {currentStep === 2 && (
              <>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-lg border border-primary/20 flex items-start gap-3 mb-6 bg-gradient-to-r from-primary/5 to-transparent"
                >
                  <div className="text-primary flex-shrink-0 mt-0.5">
                    <IconLayout />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Совет: структурируйте разделы по логике пути клиента. Начните со списка отдельно, потом обсудим оптимизацию
                  </p>
                </m.div>
                <TextArea
                  label="Укажите основные разделы сайта"
                  description="Перечислите разделы, которые должны быть на сайте"
                  placeholder="О компании&#10;Каталог&#10;Новости&#10;Контакты"
                  value={formData.sections}
                  onChange={(value) =>
                    setFormData({ ...formData, sections: value })
                  }
                  rows={5}
                />

                <CheckboxGroup
                  label="Дополнительные разделы и функции"
                  options={[
                    { id: "cabinet", label: "Личный кабинет" },
                    { id: "consultant", label: "Онлайн-консультант" },
                    { id: "blog", label: "Блог" },
                    { id: "portfolio", label: "Портфолио" },
                    { id: "gallery", label: "Фото / видео галереи" },
                    { id: "api", label: "Интеграция со сторонними сервисами" },
                    { id: "sections-other", label: "Другое", requiresInput: true },
                  ]}
                  selected={formData.modules}
                  onChange={(value) =>
                    setFormData({ ...formData, modules: value })
                  }
                  customInputs={formData.customInputs}
                  onCustomInputChange={(id, value) =>
                    setFormData({
                      ...formData,
                      customInputs: { ...formData.customInputs, [id]: value },
                    })
                  }
                  columns={2}
                />
              </>
            )}

            {/* Step 3: Design */}
            {currentStep === 3 && (
              <>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-lg border border-primary/20 flex items-start gap-3 mb-6 bg-gradient-to-r from-primary/5 to-transparent"
                >
                  <div className="text-primary flex-shrink-0 mt-0.5">
                    <IconPalette />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Совет: чем больше примеров вы предоставите, тем точнее мы создадим дизайн вашей мечты
                  </p>
                </m.div>
                <RadioGroup
                  label="Нужен ли Вам уникальный дизайн?"
                  options={[
                    {
                      id: "unique",
                      label: "Мне нужен уникальный дизайн",
                    },
                    {
                      id: "only-dev",
                      label: "У меня есть макет, нужна только разработка",
                    },
                  ]}
                  selected={formData.designApproach}
                  onChange={(value) =>
                    setFormData({ ...formData, designApproach: value })
                  }
                  columns={1}
                />

                {(formData.designApproach === "unique" || formData.designApproach === null) && (
                  <>
                    <TextArea
                      label="Примеры сайтов, дизайн которых вам нравится"
                      description="Приведите ссылки и объясните, что вам нравится"
                      placeholder="https://example1.ru - нравится минималистичный дизайн"
                      value={formData.designExamples}
                      onChange={(value) =>
                        setFormData({ ...formData, designExamples: value })
                      }
                      rows={3}
                    />

                    <CheckboxGroup
                      label="Есть ли у вас готовые элементы дизайна?"
                      options={[
                        { id: "logo", label: "Логотип компании" },
                        { id: "brand", label: "Фирменный стиль" },
                        { id: "colors", label: "Фирменные цвета" },
                        { id: "fonts", label: "Фирменные шрифты" },
                        { id: "polygraph", label: "Полиграфия" },
                        { id: "photos", label: "Фотографии" },
                        { id: "videos", label: "Видеоматериалы" },
                        { id: "elements-other", label: "Другое", requiresInput: true },
                      ]}
                      selected={formData.designElements}
                      onChange={(value) =>
                        setFormData({ ...formData, designElements: value })
                      }
                      customInputs={formData.customInputs}
                      onCustomInputChange={(id, value) =>
                        setFormData({
                          ...formData,
                          customInputs: { ...formData.customInputs, [id]: value },
                        })
                      }
                      columns={2}
                    />

                    <CheckboxGroup
                      label="Настроение и ассоциации сайта"
                      description="Какие эмоции должен вызывать дизайн?"
                      options={[
                        { id: "corporate", label: "Строгий корпоративный дизайн" },
                        { id: "bright", label: "Яркий и выразительный дизайн" },
                        {
                          id: "saturated",
                          label: "Насыщенный иллюстрациями / фото",
                        },
                        { id: "minimalist", label: "Минималистичный дизайн" },
                        { id: "retro", label: "Ретро стиль" },
                        { id: "mood-other", label: "Другое", requiresInput: true },
                      ]}
                      selected={formData.designMood}
                      onChange={(value) =>
                        setFormData({ ...formData, designMood: value })
                      }
                      customInputs={formData.customInputs}
                      onCustomInputChange={(id, value) =>
                        setFormData({
                          ...formData,
                          customInputs: { ...formData.customInputs, [id]: value },
                        })
                      }
                      columns={1}
                    />

                    <TextArea
                      label="Цветовая гамма"
                      description="Опишите, какие цвета должны быть на сайте"
                      placeholder="Основной цвет - белый, дополнительные - оттенки синего"
                      value={formData.colorScheme}
                      onChange={(value) =>
                        setFormData({ ...formData, colorScheme: value })
                      }
                      rows={3}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <MultiColorPicker
                        label="Выберите основной цвет"
                        description="Добавьте до 7 основных цветов"
                        values={formData.selectedColors}
                        onChange={(colors) =>
                          setFormData({ ...formData, selectedColors: colors })
                        }
                        maxColors={7}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* Step 4: Additional Services */}
            {currentStep === 4 && (
              <>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-lg border border-primary/20 flex items-start gap-3 mb-6 bg-gradient-to-r from-primary/5 to-transparent"
                >
                  <div className="text-primary flex-shrink-0 mt-0.5">
                    <IconRocket />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Финальный шаг: выберите услуги, которые помогут сайту работать лучше. Всё можно обсудить на консультации
                  </p>
                </m.div>
                <CheckboxGroup
                  label="Какие дополнительные услуги вам нужны?"
                  options={[
                    { id: "content", label: "Наполнение контентом" },
                    { id: "support", label: "Техническая поддержка сайта" },
                    { id: "specialist", label: "Услуги дизайнера / копирайтера / SEO" },
                    { id: "updates", label: "Регулярное обновление контента" },
                    { id: "seo", label: "SEO-продвижение" },
                    { id: "brand-style", label: "Разработка фирменного стиля" },
                    { id: "logo-design", label: "Разработка логотипа" },
                  ]}
                  selected={formData.additionalServices}
                  onChange={(value) =>
                    setFormData({ ...formData, additionalServices: value })
                  }
                  columns={1}
                />

                <RadioGroup
                  label="Нужна ли вам поддержка сайта?"
                  options={[
                    {
                      id: "no-support",
                      label: "Нет, у нас есть человек",
                      subtext: "Кто-то из команды будет заниматься поддержкой",
                    },
                    {
                      id: "yes-support",
                      label: "Да, нужна",
                      subtext: "Мы хотим, чтобы вы помогали с поддержкой",
                    },
                  ]}
                  selected={formData.supportNeeded}
                  onChange={(value) =>
                    setFormData({ ...formData, supportNeeded: value })
                  }
                  columns={1}
                />

                {formData.supportNeeded === "yes-support" && (
                  <TextArea
                    label="Опишите, почему вам нужна поддержка"
                    placeholder="Нам нужно регулярно менять цены, выкладывать новости..."
                    value={formData.supportDescription}
                    onChange={(value) =>
                      setFormData({ ...formData, supportDescription: value })
                    }
                    rows={3}
                  />
                )}
              </>
            )}
          </m.div>

          {/* Navigation Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between gap-4 mt-12 pt-12 border-t border-border"
          >
            <m.button
              type="button"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-8 py-3 rounded-lg border-2 border-border text-foreground font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Назад
            </m.button>

            {currentStep === steps.length - 1 ? (
              <m.button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:shadow-lg active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  "Отправить бриф"
                )}
              </m.button>
            ) : (
              <m.button
                type="button"
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:shadow-lg active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Далее
              </m.button>
            )}
          </m.div>
        </div>
      </div>
    </form>
  );
}
