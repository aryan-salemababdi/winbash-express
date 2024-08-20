class GetCategoryByIdStrategy {
    async execute(id: number) {
        try {
            // کد مربوط به گرفتن یک دسته‌بندی با ID مشخص از دیتابیس
            const category = {}; // فرض کنید یک دسته‌بندی از دیتابیس دریافت می‌شود
            console.log(`Category with ID ${id} fetched:`, category);
            return category;
        } catch (error) {
            throw new Error("Error fetching category");
        }
    }
}


export default GetCategoryByIdStrategy;
