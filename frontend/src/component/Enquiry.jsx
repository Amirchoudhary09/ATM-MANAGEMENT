import { useState } from "react";
import {
  Button,
  Label,
  TextInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
 
export default function VisaATMForm() {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    phone: "",
    email: "",
  });

  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...rows];
      updated[editIndex] = formData;
      setRows(updated);
      setEditIndex(null);
    } else {
      setRows([...rows, formData]);
    }
    setFormData({
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
      phone: "",
      email: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(rows[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-6">
       
      {/* Visa/ATM Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Visa / ATM Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cardholder Name */}
          <div>
            <Label htmlFor="cardholderName" value="Cardholder Name" />
            <div className="text-sm text-gray-500 mb-1">Enter full name on the card</div>
            <TextInput
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={formData.cardholderName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Card Number */}
          <div>
            <Label htmlFor="cardNumber" value="Card Number" />
            <div className="text-sm text-gray-500 mb-1">Enter 16-digit card number</div>
            <TextInput
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <Label htmlFor="expiryDate" value="Expiry Date" />
            <div className="text-sm text-gray-500 mb-1">Enter expiry in MM/YY format</div>
            <TextInput
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* CVV */}
          <div>
            <Label htmlFor="cvv" value="CVV" />
            <div className="text-sm text-gray-500 mb-1">3-digit security code at back of card</div>
            <TextInput
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>

          {/* Bank Name */}
          <div>
            <Label htmlFor="bankName" value="Bank Name" />
            <div className="text-sm text-gray-500 mb-1">Enter issuing bank name</div>
            <TextInput
              id="bankName"
              name="bankName"
              placeholder="Bank of Example"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" value="Phone" />
            <div className="text-sm text-gray-500 mb-1">Enter contact number</div>
            <TextInput
              id="phone"
              name="phone"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" value="Email" />
            <div className="text-sm text-gray-500 mb-1">Enter contact email</div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mt-4">
            <Button type="submit">{editIndex !== null ? "Update" : "Submit"}</Button>
          </div>
        </form>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Submitted Visa/ATM Details</h2>

        <Table className="min-w-full">
          <TableHead>
            <TableRow>
              <TableHeadCell>Cardholder Name</TableHeadCell>
              <TableHeadCell>Card Number</TableHeadCell>
              <TableHeadCell>Expiry Date</TableHeadCell>
              <TableHeadCell>CVV</TableHeadCell>
              <TableHeadCell>Bank</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, i) => (
                <TableRow key={i} className="bg-gray-50">
                  <TableCell>{row.cardholderName}</TableCell>
                  <TableCell>{row.cardNumber}</TableCell>
                  <TableCell>{row.expiryDate}</TableCell>
                  <TableCell>{row.cvv}</TableCell>
                  <TableCell>{row.bankName}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="xs" color="warning" onClick={() => handleEdit(i)}>
                      Edit
                    </Button>
                    <Button size="xs" color="failure" onClick={() => handleDelete(i)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
