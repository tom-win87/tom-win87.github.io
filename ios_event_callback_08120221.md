# iOS event callbacks

iOS delegate methods are triggered in response to certain events for example, when a message is ready to be displayed or the end-user opens the privacy manager.

The iOS implementation of Sourcepoint's CMP has five event callbacks: 

- [`onSPUIReady(_ controller: UIViewController)`](#onSPUIReady)
- [`onAction(_ action: SPAction, from controller: UIViewController)`](# onAction)
- [`onSPUIFinished()`](# onSPUIFinished())
- [`onConsentReady()`](# onConsentReady())
- [`onError()`](# onError())

This article describes the purpose and action for each of these functions.

---
## `onSPUIReady` `(_ controller: UIViewController)`

The `onSPUIReady` delegate method is called when there is a "web-based" message to be displayed. The controller parameter is the view controller containing the message to be displayed.

---
## `onAction` `(_ action: SPAction, from controller: UIViewController)`

The `onAction` delegate method is called once the user takes an action in the first layer message or privacy manager.

The action: `SPAction` parameter, among other data (used internally), contains:

| Parameter                      | Description                                                                                                                                                                                                                                                        |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Type: SPActionType`           | Indicates the type of action, this is an enumerated value.  For example, a response to the ATT message is `RequestATTAccess` or to show the privacy manager is `ShowPrivacyManager`.                                                                               |
| `campaignType: SPCampaignType` | Indicates the type of campaign in which the action was taken. This is an enumerated value e.g.  **gdpr, ios14, ccpa, unknown**.                                                                                                                                    |
| `customActionId: String`       | If the type of action is Custom, this attribute will contain the id you assigned to it when building the message in our message builder (publisher's portal).                                                                                                      |
| `consentLanguage`              | The language used in the messages.                                                                                                                                                                                                                                 |
| `publisherData`                | This is an arbitrary dictionary of [String: String] containing data the publisher wishes to send to our servers so it can be retrieved via API later on. The publisher needs to set this field during the callback if they need the data to be sent to our server. |

---
## `onSPUIFinished()`

The `onSPUIFinished` delegate method is invoked when the SDK determines that the UI can be removed from the view hierarchy or dismissed. It typically occurs after the end-user has taken a consent action (e.g. Accept all, Reject all, Save & Exit).

With exception of `PMCancel` and `ShowPrivacyManager` actions, the SDK will call the onSPUIFinished after handling the action.

---
## `onConsentReady()`

The `onConsentReady` will be called in two different scenarios:

- After `loadMessage` is called but there's no message to be displayed
- After the SDK receives a response for one of its consent requests. This happens after the user has taken a consent action (`AcceptAll`, `RejectAll`, `Save&Exit`) in the message or Privacy Manager

The `onConsentReady` delegate method sends the consent action to the server and receives a response, the SDK will store the data in the `UserDefaults`.

---
## `onError()`

The SDK will in all cases wrap the error in one of the SPError class and eventually call the func `onError(_ error: SPError)` callback. By default, the SDK will also remove all consent data from the device. This may cause a consent message to be shown again, depending on your scenario.

This was implemented on purpose to be the most safe possible. Since there are no consent data, vendors should refrain from performing logic that depends on it.

This behaviour can be opted-out by setting the flag `consentManager.cleanUserDataOnError` to false, after you initialise `SPConsentManager`.
