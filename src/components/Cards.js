import { Fragment, useState } from "react";
import {
  Disclosure,
  Menu,
  RadioGroup,
  Switch,
  Transition,
} from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const user = {
  name: "Lisa Marie",
  email: "lisamarie@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const subNavigation = [
  { name: "Profile", href: "#", icon: UserCircleIcon, current: false },
  { name: "Account", href: "#", icon: CogIcon, current: false },
  { name: "Password", href: "#", icon: KeyIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
  { name: "Plan & Billing", href: "#", icon: CreditCardIcon, current: true },
  { name: "Integrations", href: "#", icon: SquaresPlusIcon, current: false },
];
const plans = [
  {
    name: "Basic",
    priceMonthly: 29,
    priceYearly: 290,
    limit: "Up to $10,000 campaign amount limit",
  },
  {
    name: "Verified",
    priceMonthly: 99,
    priceYearly: 990,
    limit: "Up to $25,000 campaign amount limit",
  },
  {
    name: "Organization",
    priceMonthly: 249,
    priceYearly: 2490,
    limit: "Unlimited campaign amount",
  },
];
const payments = [
  {
    id: 1,
    date: "1/1/2020",
    datetime: "2020-01-01",
    description: "Business Plan - Annual Billing",
    amount: "CA$109.00",
    href: "#",
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Cards() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

  return (
    <>
      <main className="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
        {/* Payment details */}
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Payment method
              </h3>
              <div className="mt-5">
                <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                  <h4 className="sr-only">Visa</h4>
                  <div className="sm:flex sm:items-start">
                    <svg
                      className="h-8 w-auto sm:h-6 sm:flex-shrink-0"
                      viewBox="0 0 36 24"
                      aria-hidden="true"
                    >
                      <rect width={36} height={24} fill="#224DBA" rx={4} />
                      <path
                        fill="#fff"
                        d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                      />
                    </svg>
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Ending with 4242
                      </div>
                      <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                        <div>Expires 12/20</div>
                        <span
                          className="hidden sm:mx-2 sm:inline"
                          aria-hidden="true"
                        >
                          &middot;
                        </span>
                        <div className="mt-1 sm:mt-0">
                          Last updated on 22 Aug 2017
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section aria-labelledby="payment-details-heading">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2
                      id="payment-details-heading"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Payment details
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your billing information. Please note that updating
                      your location could affect your tax rates.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-6">
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="cc-given-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="cc-family-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-1">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expration date
                      </label>
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                        placeholder="MM / YY"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-1">
                      <label
                        htmlFor="security-code"
                        className="flex items-center text-sm font-medium text-gray-700"
                      >
                        <span>Security code</span>
                        <QuestionMarkCircleIcon
                          className="ml-1 h-5 w-5 flex-shrink-0 text-gray-300"
                          aria-hidden="true"
                        />
                      </label>
                      <input
                        type="text"
                        name="security-code"
                        id="security-code"
                        autoComplete="cc-csc"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Update payment
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Plan */}
          <section aria-labelledby="plan-heading">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2
                      id="plan-heading"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Plan
                    </h2>
                  </div>

                  <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                    <RadioGroup.Label className="sr-only">
                      {" "}
                      Pricing plans{" "}
                    </RadioGroup.Label>
                    <div className="relative -space-y-px rounded-md bg-white">
                      {plans.map((plan, planIdx) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan}
                          className={({ checked }) =>
                            classNames(
                              planIdx === 0
                                ? "rounded-tl-md rounded-tr-md"
                                : "",
                              planIdx === plans.length - 1
                                ? "rounded-bl-md rounded-br-md"
                                : "",
                              checked
                                ? "bg-orange-50 border-orange-200 z-10"
                                : "border-gray-200",
                              "relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <span className="flex items-center text-sm">
                                <span
                                  className={classNames(
                                    checked
                                      ? "bg-orange-500 border-transparent"
                                      : "bg-white border-gray-300",
                                    active
                                      ? "ring-2 ring-offset-2 ring-gray-900"
                                      : "",
                                    "h-4 w-4 rounded-full border flex items-center justify-center"
                                  )}
                                  aria-hidden="true"
                                >
                                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                                </span>
                                <RadioGroup.Label
                                  as="span"
                                  className="ml-3 font-medium text-gray-900"
                                >
                                  {plan.name}
                                </RadioGroup.Label>
                              </span>
                              <RadioGroup.Description
                                as="span"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                              >
                                <span
                                  className={classNames(
                                    checked
                                      ? "text-orange-900"
                                      : "text-gray-900",
                                    "font-medium"
                                  )}
                                >
                                  ${plan.priceMonthly} / mo
                                </span>{" "}
                                <span
                                  className={
                                    checked
                                      ? "text-orange-700"
                                      : "text-gray-500"
                                  }
                                >
                                  (${plan.priceYearly} / yr)
                                </span>
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className={classNames(
                                  checked ? "text-orange-700" : "text-gray-500",
                                  "ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                                )}
                              >
                                {plan.limit}
                              </RadioGroup.Description>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <Switch.Group as="div" className="flex items-center">
                    <Switch
                      checked={annualBillingEnabled}
                      onChange={setAnnualBillingEnabled}
                      className={classNames(
                        annualBillingEnabled ? "bg-orange-500" : "bg-gray-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          annualBillingEnabled
                            ? "translate-x-5"
                            : "translate-x-0",
                          "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                    <Switch.Label as="span" className="ml-3">
                      <span className="text-sm font-medium text-gray-900">
                        Annual billing
                      </span>
                      <span className="text-sm text-gray-500">(Save 10%)</span>
                    </Switch.Label>
                  </Switch.Group>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Billing history */}
          <section aria-labelledby="billing-history-heading">
            <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
              <div className="px-4 sm:px-6">
                <h2
                  id="billing-history-heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Billing history
                </h2>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-t border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                              Amount
                            </th>
                            {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                            <th
                              scope="col"
                              className="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
                            >
                              <span className="sr-only">View receipt</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {payments.map((payment) => (
                            <tr key={payment.id}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                <time dateTime={payment.datetime}>
                                  {payment.date}
                                </time>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {payment.description}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {payment.amount}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <a
                                  href={payment.href}
                                  className="text-orange-600 hover:text-orange-900"
                                >
                                  View receipt
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
