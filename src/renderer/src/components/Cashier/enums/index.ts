export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export const InvoiceStatuMappper = {
  [InvoiceStatus.PENDING]: 'Chờ Thanh Toán',
  [InvoiceStatus.PAID]: 'Đã Thanh Toán',
  [InvoiceStatus.CANCELLED]: 'Đã Hủy',
  [InvoiceStatus.REFUNDED]: 'Đã Hoàn Tiền'
}
