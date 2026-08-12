import {Injectable, computed, inject} from '@angular/core';
import {LanguageService} from './language.service';

export interface TranslationSchema {
    copyright: string;
    productsTitle: string;
    financialReports: string;
    latestArticles: string;
    openVacancies: string;
    phone: string;
    email: string;
    address: string;
    contactUs: string;
    selectService: string;
    subject: string;
    companyInfo: string;
    company: string;
    sendRequest: string;

    moreInformation: string;
    innovativeSolutions: string;
    specializedServices: string;
    ourPartners: string;
    partnersDescription: string;
    showAllPartners: string;
    blogPosts: string;
    annual: string;

    common: {
        viewAll: string;
        showMore: string;
        send: string;
        loading: string;
        page: string;
    };
    nav: {
        services: string;
        products: string;
        about: string;
        blog: string;
        careers: string;
        contact: string;
        language: string;
    };
    careers: {
        fullTime: string;
        partTime: string;
        jobDescription: string;
        jobResponsibilities: string;
        requirements: string;
        workingMode: string;
        filterTabs: {
            all: string;
            fullTime: string;
            partTime: string;
        };
        table: {
            position: string;
            type: string;
            location: string;
            deadline: string;
        };
        detail: {
            applyButton: string;
            viewAllJobs: string;
        };
        applyForm: {
            title: string;
            fullNameLabel: string;
            fullNameError: string;
            emailLabel: string;
            emailError: string;
            phoneLabel: string;
            phoneError: string;
            noteLabel: string;
            notePlaceholder: string;
            namePlaceholder: string;
            emailPlaceholder: string;
            phonePlaceholder: string;
            companyPlaceholder: string;
            cvUploadLabel: string;
            cvButtonText: string;
            cvNote: string;
            submitButton: string;
        };
    };
    blog: {
        showMoreRelated: string;
        readMore: string;
        filterAll: string;
    };
    shared: {
        ctaButton: string;
        ctaTrustBadge: string;
        pagination: {
            prev: string;
            next: string;
        };
    };
    validation: {
        required: string;
        emailFormat: string;
        phoneFormat: string;
        minLength: string;
        maxLength: string;
        invalidFileType: string;
        fileSizeExceeded: string;
        fullNameRequired: string;
        emailRequired: string;
        phoneRequired: string;
        serviceRequired: string;
        messageRequired: string;
        cvRequired: string;
    };
};

export const TRANSLATIONS_AZ: TranslationSchema = {
    copyright: "QafqazNet. Bütün hüquqlar qorunur.",
    productsTitle: "İşiniz üçün doğru avadanlıqlar",
    financialReports: "Maliyyə hesabatları",
    latestArticles: "Ən son məqalələr",
    openVacancies: "Açıq vakansiyalar",
    phone: "Telefon:",
    email: "E-poçt:",
    address: "Ünvan:",
    contactUs: "Bizimlə əlaqə",
    selectService: "Xidmət seçin",
    subject: "Mövzu",
    companyInfo: "Qısa məlumat buraxın, komandamız ən qısa zamanda sizinlə əlaqə saxlayacaq.",
    company: "Şirkət",
    sendRequest: "Sorğu göndərin",

    moreInformation: "Ətraflı məlumat",
    innovativeSolutions: "İnnovativ həllər, ölçülə bilən nəticələr",
    specializedServices: "Aşağıdakı xidmətlər üzrə ixtisaslaşmışıq",
    ourPartners: "Tərəfdaşlarımız",
    partnersDescription: "Müxtəlif sahələrdən olan müştərilərimiz üçün etibarlı və innovativ İT həlləri təqdim edirik. Hər layihədə keyfiyyət və uzunmüddətli əməkdaşlıq əsas prioritetimizdir.",
    showAllPartners: "20+ tərəfdaşın hamısını göstər",
    blogPosts: "Blog yazıları",
    annual: "illik",

    common: {
        viewAll: "Hamısını göstər",
        showMore: "Daha çox göstər",
        send: "Göndər",
        loading: "Yüklənir...",
        page: "səhifə"
    },
    nav: {
        services: "Xidmətlərimiz",
        products: "Məhsullar",
        about: "Şirkət",
        blog: "Bloqlar",
        careers: "Karyera",
        contact: "Konsultasiya",
        language: "AZ"
    },
    careers: {
        fullTime: "Tam ştat",
        partTime: "Yarım ştat",
        jobDescription: "İşin təsviri",
        jobResponsibilities: "Vəzifə öhdəlikləri:",
        requirements: "Tələblər:",
        workingMode: "İş rejimi:",
        filterTabs: {
            all: "Hamısı",
            fullTime: "Tam ştat",
            partTime: "Yarım ştat"
        },
        table: {
            position: "Vəzifə",
            type: "Vakansiya növü",
            location: "Yer",
            deadline: "Son müraciət tarixi"
        },
        detail: {
            applyButton: "Müraciət et",
            viewAllJobs: "Bütün vəzifələrə baxın"
        },
        applyForm: {
            title: "Uğurun bir hissəsi ol!",
            fullNameLabel: "Ad və Soyad",
            fullNameError: "Zəhmət olmasa ad və soyadınızı daxil edin",
            emailLabel: "E-poçt",
            emailError: "Düzgün e-poçt ünvanı daxil edin",
            phoneLabel: "Əlaqə nömrəsi",
            phoneError: "Əlaqə nömrəsi tələb olunur",
            noteLabel: "Qeyd və ya mesajınız",
            notePlaceholder: "Vakansiya ilə bağlı qeydiniz (istəyə bağlı)",
            namePlaceholder: "Ad və soyadınızı daxil edin",
            emailPlaceholder: "Emailinizi daxil edin",
            phonePlaceholder: "Telefon nömrəniz",
            companyPlaceholder: "Şirkət",
            cvUploadLabel: "CV faylını yüklə",
            cvButtonText: "CV faylını seç",
            cvNote: "Sadəcə PDF və ya DOCX fayl, maks: 4mb",
            submitButton: "Müraciət et"
        }
    },
    blog: {
        showMoreRelated: "Daha çox göstər",
        readMore: "Daha çox oxu",
        filterAll: "Hamısı"
    },
    shared: {
        ctaButton: "Sorğu göndər",
        ctaTrustBadge: "100+ şirkət güvənlə bizi seçir",
        pagination: {
            prev: "Əvvəlki",
            next: "Növbəti"
        }
    },
    validation: {
        required: "Bu xana mütləq doldurulmalıdır",
        emailFormat: "Düzgün e-poçt ünvanı daxil edin",
        phoneFormat: "Düzgün telefon nömrəsi daxil edin",
        minLength: "Daxil edilən mətn çox qısadır",
        maxLength: "Daxil edilən mətn çox uzundur",
        invalidFileType: "Yalnız PDF, DOC və ya DOCX faylları qəbul edilir",
        fileSizeExceeded: "Faylın həcmi maksimum həddi aşır",
        fullNameRequired: "Zəhmət olmasa ad və soyadınızı daxil edin",
        emailRequired: "Zəhmət olmasa e-poçt ünvanınızı daxil edin",
        phoneRequired: "Zəhmət olmasa telefon nömrənizi daxil edin",
        serviceRequired: "Zəhmət olmasa xidmət seçin",
        messageRequired: "Zəhmət olmasa mesajınızı daxil edin",
        cvRequired: "Zəhmət olmasa CV faylınızı yükləyin"
    }
};

export const TRANSLATIONS_EN: TranslationSchema = {
    copyright: "QafqazNet. All rights reserved.",
    productsTitle: "The right equipment for your job",
    financialReports: "Financial statements",
    latestArticles: "Latest articles",
    openVacancies: "Open vacancies",
    phone: "Phone:",
    email: "Email:",
    address: "Address:",
    contactUs: "Contact us",
    selectService: "Select service",
    subject: "Subject",
    companyInfo: "Leave a brief message, our team will contact you as soon as possible.",
    company: "Company",
    sendRequest: "Send Your Request",

    moreInformation: "More information",
    innovativeSolutions: "Innovative solutions, measurable results",
    specializedServices: "We specialize in the following services",
    ourPartners: "Our partners",
    partnersDescription: "We provide reliable and innovative IT solutions for our clients from various industries. Quality and long-term cooperation are our top priorities in every project.",
    showAllPartners: "Show all 20+ partners",
    blogPosts: "Blog posts",
    annual: "years",

    common: {
        viewAll: "View all",
        showMore: "Show more",
        send: "Send",
        loading: "Loading...",
        page: "page"
    },
    nav: {
        services: "Services",
        products: "Products",
        about: "Company",
        blog: "Blog",
        careers: "Careers",
        contact: "Consultation",
        language: "EN"
    },
    careers: {
        fullTime: "Full-time",
        partTime: "Part-time",
        jobDescription: "Job description",
        jobResponsibilities: "Job responsibilities:",
        requirements: "Requirements:",
        workingMode: "Working mode:",
        filterTabs: {
            all: "All",
            fullTime: "Full-time",
            partTime: "Part-time"
        },
        table: {
            position: "Position",
            type: "Employment Type",
            location: "Location",
            deadline: "Application Deadline"
        },
        detail: {
            applyButton: "Apply Now",
            viewAllJobs: "View all positions"
        },
        applyForm: {
            title: "Be part of our success!",
            fullNameLabel: "Full Name",
            fullNameError: "Please enter your full name",
            emailLabel: "Email",
            emailError: "Please enter a valid email address",
            phoneLabel: "Phone number",
            phoneError: "Phone number is required",
            noteLabel: "Note or message",
            notePlaceholder: "Your note regarding the vacancy (optional)",
            namePlaceholder: "Enter your full name",
            emailPlaceholder: "Enter your email",
            phonePlaceholder: "Your phone number",
            companyPlaceholder: "Company",
            cvUploadLabel: "Upload CV file",
            cvButtonText: "Choose CV file",
            cvNote: "PDF or DOCX only, max 4MB",
            submitButton: "Apply"
        }
    },
    blog: {
        showMoreRelated: "Show more",
        readMore: "Read more",
        filterAll: "All"
    },
    shared: {
        ctaButton: "Send Request",
        ctaTrustBadge: "100+ companies trust us",
        pagination: {
            prev: "Previous",
            next: "Next"
        }
    },
    validation: {
        required: "This field is required",
        emailFormat: "Please enter a valid email address",
        phoneFormat: "Please enter a valid phone number",
        minLength: "Entered text is too short",
        maxLength: "Entered text is too long",
        invalidFileType: "Only PDF, DOC, or DOCX files are accepted",
        fileSizeExceeded: "File size exceeds the maximum limit",
        fullNameRequired: "Please enter your full name",
        emailRequired: "Please enter your email address",
        phoneRequired: "Please enter your phone number",
        serviceRequired: "Please select a service",
        messageRequired: "Please enter your message",
        cvRequired: "Please upload your CV"
    }
};

export const TRANSLATIONS_RU: TranslationSchema = {
    copyright: "QafqazNet. Все права защищены.",
    productsTitle: "Правильное оборудование для вашей работы",
    financialReports: "Финансовая отчетность",
    latestArticles: "Последние статьи",
    openVacancies: "Открытые вакансии",
    phone: "Телефон:",
    email: "Электронная почта:",
    address: "Адрес:",
    contactUs: "Связаться с нами",
    selectService: "Выберите услугу",
    subject: "Предмет",
    companyInfo: "Краткая информация о вашей компании.",
    company: "Компания",
    sendRequest: "Отправьте свой запрос",

    moreInformation: "Подробнее",
    innovativeSolutions: "Инновационные решения, измеримые результаты.",
    specializedServices: "Мы специализируемся на следующих услугах",
    ourPartners: "Наши партнеры",
    partnersDescription: "Мы предоставляем надежные и инновационные ИТ-решения для наших клиентов из различных отраслей. Качество и долгосрочное сотрудничество являются нашими главными приоритетами в каждом проекте.",
    showAllPartners: "Показать всех 20+ партнеров",
    blogPosts: "Сообщения в блоге",
    annual: "годы",

    common: {
        viewAll: "Показать все",
        showMore: "Показать больше",
        send: "Отправить",
        loading: "Загрузка...",
        page: "страница"
    },
    nav: {
        services: "Услуги",
        products: "Продукты",
        about: "Компания",
        blog: "Блог",
        careers: "Карьера",
        contact: "Консультация",
        language: "RU"
    },
    careers: {
        fullTime: "На постоянной основе",
        partTime: "Неполная занятость",
        jobDescription: "Описание работы",
        jobResponsibilities: "Должностные обязанности:",
        requirements: "Требования:",
        workingMode: "Режим работы:",
        filterTabs: {
            all: "Все",
            fullTime: "На постоянной основе",
            partTime: "Неполная занятость"
        },
        table: {
            position: "Должность",
            type: "Тип занятости",
            location: "Местоположение",
            deadline: "Дедлайн подачи"
        },
        detail: {
            applyButton: "Подать заявку",
            viewAllJobs: "Смотреть все вакансии"
        },
        applyForm: {
            title: "Станьте частью нашего успеха!",
            fullNameLabel: "Имя и Фамилия",
            fullNameError: "Пожалуйста, введите ваше имя и фамилию",
            emailLabel: "Электронная почта",
            emailError: "Пожалуйста, введите корректный адрес электронной почты",
            phoneLabel: "Номер телефона",
            phoneError: "Номер телефона обязателен",
            noteLabel: "Примечание или сообщение",
            notePlaceholder: "Ваше примечание к вакансии (необязательно)",
            namePlaceholder: "Введите ваше имя",
            emailPlaceholder: "Введите email",
            phonePlaceholder: "Ваш номер телефона",
            companyPlaceholder: "Компания",
            cvUploadLabel: "Загрузить резюме",
            cvButtonText: "Выбрать файл",
            cvNote: "Только PDF или DOCX, макс. 4МБ",
            submitButton: "Подать заявку"
        }
    },
    blog: {
        showMoreRelated: "Показать больше",
        readMore: "Читать далее",
        filterAll: "Все"
    },
    shared: {
        ctaButton: "Отправить запрос",
        ctaTrustBadge: "100+ компаний доверяют нам",
        pagination: {
            prev: "Назад",
            next: "Далее"
        }
    },
    validation: {
        required: "Это поле обязательно для заполнения",
        emailFormat: "Пожалуйста, введите корректный адрес электронной почты",
        phoneFormat: "Пожалуйста, введите корректный номер телефона",
        minLength: "Введенный текст слишком короткий",
        maxLength: "Введенный текст слишком длинный",
        invalidFileType: "Принимаются только файлы PDF, DOC или DOCX",
        fileSizeExceeded: "Размер файла превышает допустимый лимит",
        fullNameRequired: "Пожалуйста, введите ваше имя и фамилию",
        emailRequired: "Пожалуйста, введите ваш адрес электронной почты",
        phoneRequired: "Пожалуйста, введите ваш номер телефона",
        serviceRequired: "Пожалуйста, выберите услугу",
        messageRequired: "Пожалуйста, введите ваше сообщение",
        cvRequired: "Пожалуйста, загрузите ваше резюме"
    }
};

@Injectable({providedIn: 'root'})
export class TranslationService {
    private readonly languageService = inject(LanguageService);

    readonly translations = computed < TranslationSchema > (() => {
        const locale = this.languageService.currentLocale();
        switch (locale) {
            case 'en':
                return TRANSLATIONS_EN;
            case 'ru':
                return TRANSLATIONS_RU;
            case 'az':
            default:
                return TRANSLATIONS_AZ;
        }
    });

    get t(): TranslationSchema {
        return this.translations();
    }
}
