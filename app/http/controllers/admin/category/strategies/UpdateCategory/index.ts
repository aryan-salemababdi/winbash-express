class UpdateCategory {
    async execute(id: number, data: any) {
        try {
            // کد مربوط به به‌روزرسانی یک دسته‌بندی
            // مثلا آپدیت دسته‌بندی با ID مشخص شده
            console.log(`Category with ID ${id} updated:`, data);
        } catch (error) {
            throw new Error("Error updating category");
        }
    }
}


export default UpdateCategory;