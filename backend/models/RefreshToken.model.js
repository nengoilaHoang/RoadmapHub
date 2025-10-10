class RefreshToken {
  constructor(
    id,
    accountId,
    token,
    expiresAt,
    createdAt,
    isRevoked,
    deviceInfo,
    ipAddress
  ) {
    this.id = id;
    this.accountId = accountId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this.isRevoked = isRevoked;
    this.deviceInfo = deviceInfo;
    this.ipAddress = ipAddress;
  }

  static fromRow(row) {
    return new RefreshToken(
      row.id,
      row.accountId,
      row.token,
      row.expiresAt,
      row.createdAt,
      row.isRevoked,
      row.deviceInfo,
      row.ipAddress
    );
  }
}

export default RefreshToken;
