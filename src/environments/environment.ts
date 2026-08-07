const apiUrl = 'https://10.70.28.66:7194/api/v1';
export const environment = {
    production: true,
    home: {
        getHomeInfo: `${apiUrl}/public/home`
    },
    blogs: {
        getAllBlogCategories: `${apiUrl}/public/blog/categories`,
        getAllBlogs: `${apiUrl}/public/blog/posts`,
        getSelectionBlogs: `${apiUrl}/public/blog/posts/{slug}`,
        getJumbotronBlogs: `${apiUrl}/public/blog/posts/featured`
    },
    contact: {
        sendContactMessage: `${apiUrl}/public/contact`
    },
    financialReports: {
        getFinancialReports: `${apiUrl}/public/financial-reports`
    },
    jobApplication: {
        sendJobApplication: `${apiUrl}/public/job-applications`
    },
    partners: {
        getAllPartners: `${apiUrl}/public/partners`
    },
    productCategories: {
        getProductCategories: `${apiUrl}/public/product-categories`
    },
    products: {
        getProducts: `${apiUrl}/public/products`,
        getProductDetails: `${apiUrl}/public/products/{slug}`
    },
    services: {
        getAllServices: `${apiUrl}/public/services`,
        getServiceDetails: `${apiUrl}/public/services/{slug}`
    },
    team: {
        getAllTeam: `${apiUrl}/public/team`
    },
    vacancies: {
        getAllVacancies: `${apiUrl}/public/vacancies`,
        getVacancyDetails: `${apiUrl}/public/vacancies/{slug}`,
        sendJobApplication: `${apiUrl}/public/job-applications`
    },
    pageContents: {
        getAllPageContents: `${apiUrl}/public/page-contents/{pageKey}`
    }
};
