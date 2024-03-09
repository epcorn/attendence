const login = async (req, res, next) => {
    const { email, phone, password } = req.body;

};
const setAdmin = async (req, res, next) => { };
const setOprato = async (req, res, next) => { };
const newEmployee = async (req, res, next) => { };
const logout = async (req, res, next) => { };
const allEmployee = async (req, res, next) => { };
const updateEmployee = async (req, res, next) => { };
const deleteEmployee = async (req, res, next) => { };

export { login, setAdmin, setOprato, newEmployee, logout, allEmployee, deleteEmployee, updateEmployee };