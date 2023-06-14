import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    links: [
      {
        href: {
          type: String,
        },
        rel: {
          type: String,
        },
        method: {
          type: String,
        },
      },
    ],
    payment_source: {
      card: {
        name: {
          type: String,
        },
        last_digits: {
          type: String,
        },
        type: {
          type: String,
        },
        from_request: {
          last_digits: {
            type: String,
          },
          expiry: {
            type: String,
          },
        },
        brand: {
          type: String,
        },
        authentication_result: {
          liability_shift: {
            type: String,
          },
          three_d_secure: {
            authentication_status: String,
            enrollment_status: String,
          },
        },
        attributes: {
          vault: {
            id: String,
            status: String,
            customer: {
              id: String,
            },
          },
        },
        expiry: {
          type: String,
        },
      },
      paypal: {
        phone_type: {
          type: String,
        },
        attributes: {
          vault: {
            id: String,
            status: String,
            customer: {
              id: String,
            },
          },
        },
        email_address: {
          type: String,
        },
        account_id: {
          type: String,
        },
        account_status: {
          type: String,
        },
        name: {
          given_name: String,
          surname: String,
        },
        phone_number: {
          national_number: String,
        },
        birth_date: {
          type: String,
        },
        tax_info: {
          tax_id: {
            type: String,
          },
          tax_id_type: {
            type: String,
          },
        },
        address: {
          address_line_1: {
            type: String,
          },
          address_line_2: {
            type: String,
          },
          admin_area_2: {
            type: String,
          },
          admin_area_1: {
            type: String,
          },
          postal_code: {
            type: String,
          },
          country_code: {
            type: String,
          },
        },
      },
    },
    payer: {
      email_address: {
        type: String,
      },
      payer_id: {
        type: String,
      },
      name: {
        given_name: {
          type: String,
        },
        surname: {
          type: String,
        },
      },
      phone: {
        phone_type: {
          type: String,
        },
        phone_number: {
          national_number: {
            type: String,
          },
        },
      },
      birth_date: {
        type: String,
      },
      tax_info: {
        tax_id: {
          type: String,
        },
        tax_id_type: {
          type: String,
        },
      },
      address: {
        address_line_1: {
          type: String,
        },
        address_line_2: {
          type: String,
        },
        admin_area_2: {
          type: String,
        },
        admin_area_1: {
          type: String,
        },
        postal_code: {
          type: String,
        },
        country_code: {
          type: String,
        },
      },
    },
    purchase_units: [
      {
        reference_id: {
          type: String,
        },
        payments: {
          authorizations: [
            {
              status: {
                type: String,
              },
              status_details: {
                reason: {
                  type: String,
                },
              },
              id: {
                type: String,
              },
              invoice_id: {
                type: String,
              },
              custom_id: {
                type: String,
              },
              links: [
                {
                  href: {
                    type: String,
                  },
                  rel: {
                    type: String,
                  },
                  method: {
                    type: String,
                  },
                },
              ],
              amount: {
                currency_code: {
                  type: String,
                },
                value: {
                  type: String,
                },
              },
              seller_protection: {
                status: {
                  type: String,
                },
                dispute_categories: [
                  {
                    type: String,
                  },
                ],
              },
              expiration_time: {
                type: String,
              },
              create_time: {
                type: String,
              },
              update_time: {
                type: String,
              },
              processor_response: {
                avs_code: {
                  type: String,
                },
                cvv_code: {
                  type: String,
                },
                response_code: {
                  type: String,
                },
                payment_advice_code: {
                  type: String,
                },
              },
            },
          ],
          captures: [
            {
              status: {
                type: String,
              },
              status_details: {
                reason: {
                  type: String,
                },
              },
              id: {
                type: String,
              },
              invoice_id: {
                type: String,
              },
              custom_id: {
                type: String,
              },
              final_capture: {
                type: Boolean,
              },
              disbursement_mode: {
                type: String,
              },
              links: [
                {
                  href: {
                    type: String,
                  },
                  rel: {
                    type: String,
                  },
                  method: {
                    type: String,
                  },
                },
              ],
              amount: {
                currency_code: {
                  type: String,
                },
                value: {
                  type: String,
                },
              },
              seller_protection: {
                status: {
                  type: String,
                },
                dispute_categories: [
                  {
                    type: String,
                  },
                ],
              },
              seller_receivable_breakdown: {
                platform_fees: [
                  {
                    type: String,
                  },
                ],
                gross_amount: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
                seller_protection: {
                  status: {
                    type: String,
                  },
                  dispute_categories: [
                    {
                      type: String,
                    },
                  ],
                },
                seller_receivable_breakdown: {
                  platform_fees: [
                    {
                      type: String,
                    },
                  ],
                  gross_amount: {
                    currency_code: {
                      type: String,
                    },
                    value: {
                      type: String,
                    },
                  },
                  receivable_amount: {
                    currency_code: {
                      type: String,
                    },
                    value: {
                      type: String,
                    },
                  },
                  exchange_rate: {
                    value: {
                      type: String,
                    },
                    source_currency: {
                      type: String,
                    },
                    target_currency: {
                      type: String,
                    },
                  },
                },
                processor_response: {
                  avs_code: {
                    type: String,
                  },
                  cvv_code: {
                    type: String,
                  },
                  response_code: {
                    type: String,
                  },
                  payment_advice_code: {
                    type: String,
                  },
                },
                create_time: {
                  type: String,
                },
                update_time: {
                  type: String,
                },
              },
            },
          ],
          refunds: [
            {
              status: {
                type: String,
              },
              status_details: {
                reason: {
                  type: String,
                },
              },
              id: {
                type: String,
              },
              invoice_id: {
                type: String,
              },
              custom_id: {
                type: String,
              },
              note_to_payer: {
                type: String,
              },
              seller_payable_breakdown: {
                platform_fees: [
                  {
                    type: String,
                  },
                ],
                net_amount_breakdown: [
                  {
                    type: String,
                  },
                ],
                gross_amount: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
                paypal_fee: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
                paypal_fee_in_receivable_currency: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
                net_amount: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
                net_amount_in_receivable_currency: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
                total_refunded_amount: {
                  currency_code: {
                    type: String,
                  },
                  value: {
                    type: String,
                  },
                },
              },
              links: [
                {
                  href: {
                    type: String,
                  },
                  rel: {
                    type: String,
                  },
                  method: {
                    type: String,
                  },
                },
              ],
              amount: {
                currency_code: {
                  type: String,
                },
                value: {
                  type: String,
                },
              },
              payer: {
                email_address: {
                  type: String,
                },
                merchant_id: {
                  type: String,
                },
              },
              create_time: {
                type: String,
              },
              update_time: {
                type: String,
              },
            },
          ],
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
