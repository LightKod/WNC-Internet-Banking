-- Create 'account' table
CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    account_type VARCHAR(20) DEFAULT 'payment',  -- Changed ENUM to VARCHAR
    balance DECIMAL(15, 2) NOT NULL,
    currency CHAR(3) DEFAULT 'USD',
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Changed DATETIME to TIMESTAMP
);

-- Create 'transaction' table
CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    source_account VARCHAR(20),
    destination_account VARCHAR(20) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL,  -- Changed ENUM to VARCHAR
    fee_payer VARCHAR(20) DEFAULT 'sender',  -- Changed ENUM to VARCHAR
    content TEXT,
    status VARCHAR(20) DEFAULT 'PENDING' NOT NULL,  -- Changed ENUM to VARCHAR
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Changed DATETIME to TIMESTAMP
    source_bank VARCHAR(50),
    destination_bank VARCHAR(50),
    remarks VARCHAR(255)
);

-- Create 'debts' table
CREATE TABLE debts (
    id SERIAL PRIMARY KEY,
    creditor_account VARCHAR(20) NOT NULL, -- Receiver
    debtor_account VARCHAR(20) NOT NULL, -- Payer
    amount DECIMAL(18, 8) NOT NULL,
    description TEXT,
    cancel_note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Changed DATETIME to TIMESTAMP
    due_date TIMESTAMP,  -- Changed DATETIME to TIMESTAMP
    status VARCHAR(20) DEFAULT 'NEW'  -- Changed ENUM to VARCHAR
);

-- Create 'debt_transaction' table
CREATE TABLE debt_transaction (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    debt_id BIGINT NOT NULL,
    transaction_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' NOT NULL,  -- Changed ENUM to VARCHAR
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Changed DATETIME to TIMESTAMP
    FOREIGN KEY (debt_id) REFERENCES debts(id) ON DELETE CASCADE,
    FOREIGN KEY (transaction_id) REFERENCES transaction(id) ON DELETE CASCADE
);


-- Create 'linked_banks' table
CREATE TABLE linked_banks (
    id SERIAL PRIMARY KEY,
    bank_code VARCHAR(255) NOT NULL UNIQUE,
    bank_name VARCHAR(255) NOT NULL,
    public_key TEXT NOT NULL, -- Hash signature
    secret_key VARCHAR(255) NOT NULL, -- Hash data
    encryption_type VARCHAR(10) NOT NULL,  -- Changed ENUM to VARCHAR
    account_info_api_url VARCHAR(255) NOT NULL,
    deposit_api_url VARCHAR(255) NOT NULL
);

-- Create 'otps' table
CREATE TABLE otps (
    id SERIAL PRIMARY KEY,
    transaction_id INT,
    user_id INT,
    purpose VARCHAR(20) DEFAULT 'transaction',  -- Changed ENUM to VARCHAR
    otp_code VARCHAR(6) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',  -- Changed ENUM to VARCHAR
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Changed DATETIME to TIMESTAMP
);

-- Create 'refresh_tokens' table
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,  -- Changed DATETIME to TIMESTAMP
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Changed DATETIME to TIMESTAMP
);



-- Create 'user_contact' table
CREATE TABLE user_contact (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    account_number VARCHAR(20) NOT NULL,
    nickname VARCHAR(50),
    bank_id VARCHAR(20) NOT NULL,
    bank_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Changed DATETIME to TIMESTAMP
);

-- Create 'user' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Changed DATETIME to TIMESTAMP
    role VARCHAR(20) DEFAULT 'user',  -- Changed ENUM to VARCHAR
    status VARCHAR(20) DEFAULT 'active'  -- Changed ENUM to VARCHAR
);



INSERT INTO users (username, name, password, email, phone_number, role, status, created_at) VALUES --Password: password123
('john_doe', 'John Doe', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'john.doe@example.com', '1234567890', 'user', 'active', NOW()),
('jane_smith', 'Jane Smith', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'jane.smith@example.com', '1234567891', 'user', 'active', NOW()),
('michael_brown', 'Michael Brown', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'michael.brown@example.com', '1234567892', 'user', 'active', NOW()),
('emily_white', 'Emily White', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'emily.white@example.com', '1234567893', 'user', 'active', NOW()),
('daniel_grey', 'Daniel Grey', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'daniel.grey@example.com', '1234567894', 'user', 'active', NOW()),
('sarah_black', 'Sarah Black', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'sarah.black@example.com', '1234567895', 'user', 'inactive', NOW()),
('lucas_green', 'Lucas Green', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'lucas.green@example.com', '1234567896', 'employee', 'active', NOW()),
('emma_brown', 'Emma Brown', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'emma.brown@example.com', '1234567897', 'employee', 'active', NOW()),
('oliver_blue', 'Oliver Blue', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'oliver.blue@example.com', '1234567898', 'employee', 'active', NOW()),
('admin', 'Admin Master', '$2b$10$yyzs9kWabQbJC3nTeaR71.qp6NZL2AbjaHu5p8eo8a3owjdituuUy', 'admin.master@example.com', '1234567899', 'admin', 'active', NOW());



INSERT INTO account (account_number, account_type, balance, currency, user_id, created_at) VALUES
('100000000001', 'payment', 10000.00, 'USD', 1, NOW()),
('100000000002', 'payment', 10000.00, 'USD', 2, NOW()),
('100000000003', 'payment', 10000.00, 'USD', 3, NOW()),
('100000000004', 'payment', 10000.00, 'USD', 4, NOW()),
('100000000005', 'payment', 10000.00, 'USD', 5, NOW()),
('100000000006', 'payment', 10000.00, 'USD', 6, NOW()),
('100000000007', 'payment', 10000.00, 'USD', 7, NOW()),
('100000000008', 'payment', 10000.00, 'USD', 8, NOW()),
('100000000009', 'payment', 10000.00, 'USD', 9, NOW()),
('100000000010', 'payment', 10000.00, 'USD', 10, NOW());


-- Example for account_number 1000000000001:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000001', '100000000002', 50.00, 'internal', 'sender', 'Payment for service', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000001', '100000000003', 100.00, 'internal', 'receiver', 'Refund for overpayment', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000001', '100000000004', 200.00, 'internal', 'sender', 'Payment for goods', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000001', '100000000005', 10.00, 'internal', 'receiver', 'Gift from friend', 'FAILED', NOW(), '', '', 'Insufficient funds'),
('100000000001', '100000000006', 50.00, 'internal', 'sender', 'Payment for services', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000001', '100000000007', 30.00, 'internal', 'receiver', 'Payment towards debt', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000001', '100000000008', 75.00, 'internal', 'sender', 'Deposit from salary', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000001', '100000000009', 150.00, 'internal', 'receiver', 'Payment for services rendered', 'PENDING', NOW(), '', '', 'No remarks');

-- Example for account_number 1000000000002:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000002', '100000000003', 120.00, 'internal', 'sender', 'Payment for consulting', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000002', '100000000004', 200.00, 'internal', 'receiver', 'Salary payment', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000002', '100000000005', 300.00, 'internal', 'sender', 'Charity donation', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000002', '100000000006', 50.00, 'internal', 'receiver', 'Refund for purchase', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000002', '100000000007', 40.00, 'internal', 'sender', 'Refund for purchase', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000002', '100000000008', 250.00, 'internal', 'receiver', 'Deposit from freelance work', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000002', '100000000009', 80.00, 'internal', 'sender', 'Investment returns', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000002', '100000000010', 100.00, 'internal', 'receiver', 'Debt repayment to lender', 'PENDING', NOW(), '', '', 'No remarks');

-- For account_number 1000000000003:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000003', '100000000004', 150.00, 'internal', 'sender', 'Payment for supplies', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000003', '100000000005', 60.00, 'internal', 'receiver', 'Refund for subscription', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000003', '100000000006', 200.00, 'internal', 'sender', 'Payment for service', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000003', '100000000007', 80.00, 'internal', 'receiver', 'Payment for freelance work', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000003', '100000000008', 50.00, 'internal', 'sender', 'Refund for overcharge', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000003', '100000000009', 120.00, 'internal', 'receiver', 'Gift payment', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000003', '100000000010', 300.00, 'internal', 'sender', 'Investment transfer', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000003', '100000000001', 70.00, 'internal', 'receiver', 'Reimbursement', 'FAILED', NOW(), '', '', 'Insufficient funds');


-- For account_number 1000000000004:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000004', '100000000005', 40.00, 'internal', 'sender', 'Payment for rent', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000004', '100000000006', 80.00, 'internal', 'receiver', 'Payment for groceries', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000004', '100000000007', 60.00, 'internal', 'sender', 'Charity donation', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000004', '100000000008', 100.00, 'internal', 'receiver', 'Deposit from client', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000004', '100000000009', 250.00, 'internal', 'sender', 'Payment for services rendered', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000004', '100000000010', 70.00, 'internal', 'receiver', 'Refund for subscription', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000004', '100000000001', 40.00, 'internal', 'sender', 'Payment for debt', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000004', '100000000002', 90.00, 'internal', 'receiver', 'Payment for event', 'PENDING', NOW(), '', '', 'No remarks');

-- For account_number 1000000000005:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000005', '100000000006', 150.00, 'internal', 'sender', 'Payment for course', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000005', '100000000007', 200.00, 'internal', 'receiver', 'Payment for consultancy', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000005', '100000000008', 250.00, 'internal', 'sender', 'Payment for purchase', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000005', '100000000009', 50.00, 'internal', 'receiver', 'Refund for late delivery', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000005', '100000000010', 100.00, 'internal', 'sender', 'Payment for services rendered', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000005', '100000000001', 200.00, 'internal', 'receiver', 'Investment return', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000005', '100000000002', 30.00, 'internal', 'sender', 'Refund for product', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000005', '100000000003', 70.00, 'internal', 'receiver', 'Payment for services', 'SUCCESS', NOW(), '', '', 'No remarks');

-- For account_number 1000000000006:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000006', '100000000007', 120.00, 'internal', 'sender', 'Payment for consulting work', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000006', '100000000008', 180.00, 'internal', 'receiver', 'Payment for freelancing', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000006', '100000000009', 150.00, 'internal', 'sender', 'Payment for contract work', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000006', '100000000010', 200.00, 'internal', 'receiver', 'Refund for booking fee', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000006', '100000000001', 90.00, 'internal', 'sender', 'Refund for overcharge', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000006', '100000000002', 50.00, 'internal', 'receiver', 'Payment for event hosting', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000006', '100000000003', 180.00, 'internal', 'sender', 'Payment for supplies', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000006', '100000000004', 60.00, 'internal', 'receiver', 'Payment for subcontractor', 'SUCCESS', NOW(), '', '', 'No remarks');

-- For account_number 1000000000007:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000007', '100000000008', 50.00, 'internal', 'sender', 'Payment for consulting', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000007', '100000000009', 120.00, 'internal', 'receiver', 'Payment for services', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000007', '100000000010', 90.00, 'internal', 'sender', 'Payment for subscription', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000007', '100000000001', 60.00, 'internal', 'receiver', 'Payment for tools', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000007', '100000000002', 150.00, 'internal', 'sender', 'Payment for freelance work', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000007', '100000000003', 180.00, 'internal', 'receiver', 'Refund for product', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000007', '100000000004', 30.00, 'internal', 'sender', 'Refund for order', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000007', '100000000005', 50.00, 'internal', 'receiver', 'Payment for goods', 'SUCCESS', NOW(), '', '', 'No remarks');

-- For account_number 1000000000008:
INSERT INTO transaction (source_account, destination_account, amount, transaction_type, fee_payer, content, status, transaction_date, source_bank, destination_bank, remarks) VALUES
('100000000008', '100000000009', 100.00, 'internal', 'sender', 'Payment for rental service', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000008', '100000000010', 80.00, 'internal', 'receiver', 'Payment for services rendered', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000008', '100000000001', 120.00, 'internal', 'sender', 'Payment for event organization', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000008', '100000000002', 90.00, 'internal', 'receiver', 'Payment for repairs', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000008', '100000000003', 150.00, 'internal', 'sender', 'Payment for consulting', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000008', '100000000004', 70.00, 'internal', 'receiver', 'Refund for booking', 'PENDING', NOW(), '', '', 'No remarks'),
('100000000008', '100000000005', 180.00, 'internal', 'sender', 'Payment for supply', 'SUCCESS', NOW(), '', '', 'No remarks'),
('100000000008', '100000000006', 250.00, 'internal', 'receiver', 'Payment for freelance services', 'SUCCESS', NOW(), '', '', 'No remarks');


INSERT INTO linked_banks (bank_code, bank_name,public_key,secret_key,encryption_type,account_info_api_url,deposit_api_url) VALUES
('RSA','wnc_final_project','-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQBeOb+nUatXNPH9jBaNaPXA
k9GJGb2rEQF0GCdj/WLW9+CzyWgBQCZWUBZqQGInyC7jam5Ci5u0qwkBUqecN/gX
fGHatOxWNYz/7TYN6FArVf0YGCVmx45vhzAS/WhkpsghodCgLVto3nM1UWtzH6cq
viK9IghpBMKsje0xudL5yeI11YC8zXmO8+WXQDb9Dm/nWONKX84H1jebkICy3IGn
YhQK133c28+65XdWkELgQeLVtA9C9H1nbaG0GSZzzC+BsDmPFF+PgZxom1PX5JmS
4nVf8ZvVoZM9qyCdjLqGLuSVSXuodGNMoRRQxJBHVqeqzcjWz6bjR//drIB/4l3R
AgMBAAE=
-----END PUBLIC KEY-----','SecretKey','RSA','http://wnc_final_project-backend-1:5555/interbanks/handle-search-interbank-account','http://wnc_final_project-backend-1:5555/interbanks/handle-trade-interbank');