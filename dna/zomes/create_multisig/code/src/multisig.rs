/************************ Import Required Libraries */
use hdk::{
    entry_definition::ValidatingEntryType,
    error::{ZomeApiError, ZomeApiResult},
    AGENT_ADDRESS, DNA_ADDRESS, PUBLIC_TOKEN,
};

use hdk::holochain_core_types::dna::entry_types::Sharing;
use hdk::holochain_core_types::{entry::Entry, validation::EntryValidationData};
use holochain_wasm_utils::api_serialization::{
    get_entry::{GetEntryOptions, GetEntryResult},
    get_links::GetLinksOptions,
};

use hdk::holochain_json_api::{error::JsonError, json::JsonString};
use hdk::holochain_persistence_api::cas::content::Address;
use hdk::prelude::AddressableContent;
use hdk::prelude::LinkMatch;
use hdk::ValidationData;
use std::convert::TryFrom;
use serde_json::json;
/******************************************* */

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Multisig {
    title: String,
    description: String,
    owners: Vec<Address>,
    required: u64
}

impl Multisig {
    pub fn new(title: String, description: String) -> Self {
        Multisig {
            title,
            description,
            owners: vec![AGENT_ADDRESS.clone()],
            required: 1
        }
    }

    pub fn get(address: Address) -> ZomeApiResult<Self> {
        hdk::utils::get_as_type(address.to_string().into())
    }

    pub fn from(title: String, description: String, owners: Vec<Address>, required: u64) -> Self {
        Multisig {
            title,
            description,
            owners,
            required
        }
    }
    pub fn entry(&self) -> Entry {
        Entry::App("multisig".into(), self.into())
    }
}

pub fn create(title: String, description: String) -> ZomeApiResult<Address> {
    let new_multisig = Multisig::new(title, description);
    let new_multisig_entry = new_multisig.entry();
    let new_multisig_address = hdk::commit_entry(&new_multisig_entry)?;
    Ok(new_multisig_address)
}

pub fn get(address: Address) -> ZomeApiResult<Multisig> {
    Multisig::get(address)
}

/***********Multisig Entry Def */
pub fn entry_def() -> ValidatingEntryType {
    entry!(
        name: "multisig",
        description: "this is the multisig entry def",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Multisig> | {
            Ok(())
        },
        links: []
    )
}