;; Classroom DAO Builder Contract
;; Launch a DAO for educational purposes in 1 click

;; Define the governance token for DAO
(define-fungible-token classroom-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-authorized (err u101))
(define-constant err-invalid-amount (err u102))
(define-constant err-dao-exists (err u103))
(define-constant err-dao-not-found (err u104))

;; Data structures
(define-map classroom-daos 
  principal 
  {
    name: (string-ascii 50),
    description: (string-ascii 200),
    created-at: uint,
    token-supply: uint,
    is-active: bool
  })

(define-map dao-members 
  {dao-creator: principal, member: principal}
  {
    tokens: uint,
    joined-at: uint,
    is-admin: bool
  })

;; Data variables
(define-data-var total-daos uint u0)

;; Function 1: Create a new Classroom DAO
(define-public (create-classroom-dao 
  (dao-name (string-ascii 50)) 
  (dao-description (string-ascii 200)) 
  (initial-token-supply uint))
  (begin
    ;; Validate inputs
    (asserts! (> initial-token-supply u0) err-invalid-amount)
    (asserts! (is-none (map-get? classroom-daos tx-sender)) err-dao-exists)
    
    ;; Validate name and description length
    (asserts! (<= (len dao-name) u50) err-invalid-amount)
    (asserts! (<= (len dao-description) u200) err-invalid-amount)
    ;; Create the DAO entry
    (map-set classroom-daos tx-sender
      {
        name: dao-name,
        description: dao-description,
        created-at: stacks-block-height,
        token-supply: initial-token-supply,
        is-active: true
      })
    
    ;; Mint governance tokens to DAO creator
    (try! (ft-mint? classroom-token initial-token-supply tx-sender))
    
    ;; Add creator as admin member
    (map-set dao-members {dao-creator: tx-sender, member: tx-sender}
      {
        tokens: initial-token-supply,
        joined-at: stacks-block-height,
        is-admin: true
      })
    
    ;; Update total DAO count
    (var-set total-daos (+ (var-get total-daos) u1))
    
    ;; Print event for indexing
    (print {
      event: "dao-created",
      creator: tx-sender,
      name: dao-name,
      supply: initial-token-supply
    })
    
    (ok true)))

;; Function 2: Join a Classroom DAO as a member
(define-public (join-classroom-dao 
  (dao-creator principal) 
  (stx-payment uint))
  (let (
    (dao-info (unwrap! (map-get? classroom-daos dao-creator) err-dao-not-found))
    (tokens-to-mint (/ stx-payment u1000)) ;; 1 token per 1000 microSTX
  )
    ;; Validate DAO exists and is active
    (asserts! (get is-active dao-info) err-dao-not-found)
    (asserts! (> stx-payment u0) err-invalid-amount)
    (asserts! (> tokens-to-mint u0) err-invalid-amount)
    
    ;; Transfer STX payment to DAO creator (treasury)
    (try! (stx-transfer? stx-payment tx-sender dao-creator))
    
    ;; Mint governance tokens to new member
    (try! (ft-mint? classroom-token tokens-to-mint tx-sender))
    
    ;; Add member to DAO
    (map-set dao-members {dao-creator: dao-creator, member: tx-sender}
      {
        tokens: tokens-to-mint,
        joined-at: stacks-block-height,
        is-admin: false
      })
    
    ;; Update DAO token supply
    (map-set classroom-daos dao-creator
      (merge dao-info {token-supply: (+ (get token-supply dao-info) tokens-to-mint)}))
    
    ;; Print event for indexing
    (print {
      event: "member-joined",
      dao-creator: dao-creator,
      member: tx-sender,
      tokens-received: tokens-to-mint,
      payment: stx-payment
    })
    
    (ok tokens-to-mint)))

;; Read-only functions for querying DAO data

;; Get DAO information
(define-read-only (get-dao-info (dao-creator principal))
  (map-get? classroom-daos dao-creator))

;; Get member information
(define-read-only (get-member-info (dao-creator principal) (member principal))
  (map-get? dao-members {dao-creator: dao-creator, member: member}))

;; Get total number of DAOs created
(define-read-only (get-total-daos)
  (var-get total-daos))

;; Get governance token balance
(define-read-only (get-token-balance (account principal))
  (ft-get-balance classroom-token account))
