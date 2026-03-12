"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Mic,
  Guitar,
  Drum,
  Piano,
  Disc3,
  Users,
  Award,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Phone,
  MessageCircle,
  Send,
  Play,
  Quote,
  GraduationCap,
  Calendar,
  Gift,
  Percent,
  X,
  Check,
  Sparkles,
  Heart,
  Music,
  Baby,
  User,
  CheckCircle2,
} from "lucide-react";

// Types
interface FormData {
  name: string;
  phone: string;
  direction: string;
}

// Constants
const DIRECTIONS = [
  {
    id: "vocal",
    name: "Вокал",
    icon: Mic,
    description: "Постановка голоса, техника дыхания, сценическое мастерство",
    color: "from-orange-500 to-red-500",
    bgGradient: "bg-gradient-to-br from-orange-50 to-red-50",
  },
  {
    id: "guitar",
    name: "Гитара",
    icon: Guitar,
    description: "Акустическая и электрогитара для начинающих и продолжающих",
    color: "from-amber-500 to-orange-500",
    bgGradient: "bg-gradient-to-br from-amber-50 to-orange-50",
  },
  {
    id: "drums",
    name: "Барабаны",
    icon: Drum,
    description: "Ритмика, техника игры, игра под любимые треки",
    color: "from-yellow-500 to-amber-500",
    bgGradient: "bg-gradient-to-br from-yellow-50 to-amber-50",
  },
  {
    id: "piano",
    name: "Фортепиано",
    icon: Piano,
    description: "Классическое и современное фортепиано, синтезатор",
    color: "from-orange-400 to-yellow-500",
    bgGradient: "bg-gradient-to-br from-orange-50 to-yellow-50",
  },
  {
    id: "dj",
    name: "DJ",
    icon: Disc3,
    description: "Диджеинг, создание музыки, работа с оборудованием",
    color: "from-red-500 to-orange-500",
    bgGradient: "bg-gradient-to-br from-red-50 to-orange-50",
  },
];

const ADVANTAGES = [
  {
    icon: GraduationCap,
    title: "Опытные преподаватели",
    description: "Профессионалы с высшим музыкальным образованием",
  },
  {
    icon: Users,
    title: "Маленькие группы",
    description: "Индивидуальный подход к каждому ученику",
  },
  {
    icon: Star,
    title: "Выступления учеников",
    description: "Регулярные концерты и отчётные выступления",
  },
  {
    icon: Sparkles,
    title: "Быстрый результат",
    description: "Первые успехи уже после нескольких занятий",
  },
  {
    icon: MapPin,
    title: "Рядом с домом",
    description: "Удобное расположение в микрорайоне Яркий",
  },
];

const TEACHERS = [
  {
    name: "Ахматгалиева Тереза Зиннуровна",
    education: "высшее",
    direction: "Гитара",
    experience: "40 лет",
    image: "/teachers/teacher-1.jpg",
  },
  {
    name: "Габдуллина Татьяна Робертовна",
    education: "высшее",
    direction: "Гитара / Вокал",
    experience: "25 лет",
    image: "/teachers/teacher-2.jpg",
  },
  {
    name: "Давлетшина Диана Раилевна",
    education: "среднее специальное",
    direction: "Вокал / Фортепиано",
    experience: "2.5 года",
    image: "/teachers/teacher-3.jpg",
  },
  {
    name: "Сайфутдинова Алсу Азатовна",
    education: "среднее специальное",
    direction: "Вокал / Фортепиано",
    experience: "5 лет",
    image: "/teachers/teacher-4.jpg",
  },
  {
    name: "Семёнов Петр Александрович",
    education: "высшее",
    direction: "Барабаны",
    experience: "2 года",
    image: "/teachers/teacher-5.jpg",
  },
  {
    name: "Латыпов Айрат Хамитович",
    education: "высшее",
    direction: "Диджеинг",
    experience: "2 года",
    image: "/teachers/teacher-6.jpg",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Запись",
    description: "Оставьте заявку на сайте или позвоните нам",
    icon: Send,
  },
  {
    number: "02",
    title: "Знакомство",
    description: "Познакомимся и подберём удобное время",
    icon: Heart,
  },
  {
    number: "03",
    title: "Пробное занятие",
    description: "Бесплатное пробное занятие с преподавателем",
    icon: Music,
  },
  {
    number: "04",
    title: "Обучение",
    description: "Начните свой музыкальный путь с нами",
    icon: Star,
  },
];

const PROMOTIONS = [
  {
    icon: Gift,
    title: "Приведи друга",
    description: "Скидка 500 ₽ при записи с другом",
    badge: "500 ₽",
  },
  {
    icon: Percent,
    title: "Семейная скидка",
    description: "10% при покупке 4 и более абонементов",
    badge: "10%",
  },
];

const REVIEWS = [
  {
    name: "Анна М.",
    text: "Дочь занимается вокалом уже год. Преподаватели замечательные, ребёнок в восторге! Уже выступили на двух концертах.",
    rating: 5,
    direction: "Вокал",
  },
  {
    name: "Сергей П.",
    text: "В 35 лет решил научиться играть на гитаре. Думал, не получится. Но благодаря терпению преподавателя уже играю любимые песни!",
    rating: 5,
    direction: "Гитара",
  },
  {
    name: "Марина К.",
    text: "Сын ходит на барабаны с огромным удовольствием. Отличная школа, удобное расположение рядом с домом.",
    rating: 5,
    direction: "Барабаны",
  },
  {
    name: "Ольга В.",
    text: "Прекрасная атмосфера, душевные преподаватели. Рекомендую всем родителям, кто хочет развить творческие способности детей!",
    rating: 5,
    direction: "Фортепиано",
  },
];

const GALLERY_IMAGES = [
  { src: "/gallery/class-1.jpg", alt: "Занятие вокалом" },
  { src: "/gallery/class-2.jpg", alt: "Урок игры на гитаре" },
  { src: "/gallery/class-3.jpg", alt: "Барабанная студия" },
  { src: "/gallery/class-4.jpg", alt: "Занятие на фортепиано" },
  { src: "/gallery/concert-1.jpg", alt: "Выступление учеников" },
  { src: "/gallery/concert-2.jpg", alt: "Концерт в школе" },
];

// Main Component
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    direction: "",
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  // Handle scroll for sticky button visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open modal with preselected direction
  const openModal = useCallback((direction?: string) => {
    setSelectedDirection(direction || "");
    setFormData((prev) => ({ ...prev, direction: direction || "" }));
    setIsModalOpen(true);
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, укажите имя и телефон",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          direction: formData.direction || selectedDirection,
        }),
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время",
        });
        setIsModalOpen(false);
        setFormData({ name: "", phone: "", direction: "" });
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch {
      toast({
        title: "Ошибка",
        description: "Попробуйте позвонить нам напрямую",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format phone number
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    if (digits.length <= 1) return `+7 (${digits}`;
    if (digits.length <= 4) return `+7 (${digits.slice(1, 4)}`;
    if (digits.length <= 7)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
    if (digits.length <= 9)
      return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-gray-900">
                  Оранжевое настроение
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Музыкальная школа в Уфе
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="tel:+79179070789"
                className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+7 917 907 07 89</span>
              </a>
              <Button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold shadow-lg shadow-orange-200"
              >
                Записаться
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 min-h-[600px] sm:min-h-[700px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-band.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        {/* Orange Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-transparent to-amber-900/30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-500/90 text-white hover:bg-orange-500 px-4 py-1.5 backdrop-blur-sm">
              <MapPin className="w-3 h-3 mr-1" />
              Микрорайон Яркий, Уфа
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Музыкальная школа для детей и взрослых в{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                микрорайоне Яркий
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">
              Научим петь и играть на инструментах, даже если ребёнок никогда не
              занимался музыкой. Первое пробное занятие —{" "}
              <span className="font-semibold text-amber-400">бесплатно!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => openModal()}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg px-8 py-6 shadow-xl shadow-orange-900/30 animate-pulse-glow"
              >
                Записаться на пробное занятие
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <a
                href="https://wa.me/79179070789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-semibold px-8 py-6 backdrop-blur-sm"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Написать в WhatsApp
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Бесплатное пробное занятие</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Опытные преподаватели</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Рядом с домом</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section id="directions" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">
              Направления обучения
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Выберите направление
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Индивидуальные и групповые занятия для детей и взрослых
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {DIRECTIONS.map((direction) => {
              const IconComponent = direction.icon;
              return (
                <Card
                  key={direction.id}
                  className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  onClick={() => openModal(direction.id)}
                >
                  <CardContent className={`p-0 ${direction.bgGradient}`}>
                    <div className="p-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${direction.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                        {direction.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {direction.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="w-full text-orange-600 hover:text-orange-700 hover:bg-white/50 font-semibold group-hover:bg-white/80"
                      >
                        Записаться
                        <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">
              Почему мы
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              5 причин выбрать нас
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ADVANTAGES.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">
              Фотогалерея
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Как проходят занятия
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Посмотрите фото наших уютных классов и выступлений учеников
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-white font-medium">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Смотреть все фото
            </Button>
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">
              Преподаватели
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Познакомьтесь с нашей командой
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Профессиональные музыканты с многолетним опытом преподавания
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEACHERS.map((teacher, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-center p-6 gap-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-12 h-12 text-orange-500" />
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-1">
                        {teacher.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-orange-100 text-orange-700"
                      >
                        {teacher.direction}
                      </Badge>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {teacher.education}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {teacher.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">
              Как начать
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Как проходят занятия
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-500">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-orange-200 to-transparent" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button
              size="lg"
              onClick={() => openModal()}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-10 py-6 shadow-xl shadow-orange-200/50"
            >
              Начать обучение
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">Акции</Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Специальные предложения
            </h2>
          </div>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROMOTIONS.map((promo, index) => {
              const IconComponent = promo.icon;
              return (
                <Card
                  key={index}
                  className="overflow-hidden border-2 border-orange-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-200">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-display font-bold text-lg text-gray-900">
                            {promo.title}
                          </h3>
                          <Badge className="bg-orange-500 text-white">
                            {promo.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {promo.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">Отзывы</Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Что говорят наши ученики
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-orange-200 mb-2" />
                  <p className="text-gray-600 text-sm mb-4">{review.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      {review.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {review.direction}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <Badge className="mb-3 bg-orange-100 text-orange-700">
              Контакты
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Как нас найти
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Info */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                    Свяжитесь с нами
                  </h3>
                  <div className="space-y-4">
                    <a
                      href="tel:+79179070789"
                      className="flex items-center gap-4 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Телефон</p>
                        <p className="font-semibold text-gray-900">
                          +7 917 907 07 89
                        </p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/79179070789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-semibold text-gray-900">
                          Написать сообщение
                        </p>
                      </div>
                    </a>
                    <a
                      href="https://t.me/orange_mood_ufa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Telegram</p>
                        <p className="font-semibold text-gray-900">
                          @orange_mood_ufa
                        </p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Адрес</p>
                        <p className="font-semibold text-gray-900">
                          г. Уфа, ул. Архитектора Калимуллина, д.1
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-orange-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="font-semibold text-gray-900">
                        Режим работы
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Пн-Пт: 10:00 – 21:00
                    </p>
                    <p className="text-sm text-gray-600">
                      Сб-Вс: 10:00 – 18:00
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="h-full min-h-[300px] sm:min-h-[400px] bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <p className="font-semibold text-gray-900 mb-2">
                      Мы на карте
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Уфа, ул. Архитектора Калимуллина, д.1
                    </p>
                    <a
                      href="https://yandex.ru/maps/-/CDfZyZ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white">
                        Открыть карту
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Запишите ребёнка на пробное занятие
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Бесплатное вводное занятие — попробуйте и убедитесь, что нам по
              пути!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => openModal()}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-10 py-6 shadow-xl"
              >
                Записаться сейчас
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <a
                href="tel:+79179070789"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-white text-white hover:bg-white/10 font-semibold px-10 py-6"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Позвонить
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-lg">
                  Оранжевое настроение
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Музыкальная школа для детей и взрослых в Уфе
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Направления</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {DIRECTIONS.map((dir) => (
                  <li key={dir.id}>
                    <button
                      onClick={() => openModal(dir.id)}
                      className="hover:text-orange-400 transition-colors"
                    >
                      {dir.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="tel:+79179070789"
                    className="hover:text-orange-400 transition-colors"
                  >
                    +7 917 907 07 89
                  </a>
                </li>
                <li>г. Уфа, ул. Архитектора Калимуллина, д.1</li>
                <li>
                  <a
                    href="https://wa.me/79179070789"
                    className="hover:text-orange-400 transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/orange_mood_ufa"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Пн-Пт: 10:00 – 21:00</li>
                <li>Сб-Вс: 10:00 – 18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} Оранжевое настроение. Все права
              защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Button (Mobile) */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-orange-100 shadow-lg z-40 transition-all duration-300 lg:hidden ${
          isScrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <Button
          onClick={() => openModal()}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 shadow-lg"
        >
          Записаться на пробное занятие
        </Button>
      </div>

      {/* Sticky CTA Button (Desktop) */}
      <div
        className={`fixed bottom-8 right-8 z-40 hidden lg:block transition-all duration-300 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Button
          onClick={() => openModal()}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-4 shadow-xl shadow-orange-300/30 animate-pulse-glow"
        >
          Записаться
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Modal Form */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Записаться на пробное занятие
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                placeholder="Как вас зовут?"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: formatPhone(e.target.value) })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label>Направление</Label>
              <Select
                value={formData.direction || selectedDirection}
                onValueChange={(value) =>
                  setFormData({ ...formData, direction: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Выберите направление" />
                </SelectTrigger>
                <SelectContent>
                  {DIRECTIONS.map((dir) => (
                    <SelectItem key={dir.id} value={dir.id}>
                      {dir.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
