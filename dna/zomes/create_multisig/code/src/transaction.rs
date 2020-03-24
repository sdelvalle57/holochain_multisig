/************************ Import Required Libraries */
use hdk::{
    entry_definition::ValidatingEntryType,
    error::{ZomeApiError, ZomeApiResult},
    AGENT_ADDRESS, DNA_ADDRESS, PUBLIC_TOKEN,
};

use hdk::holochain_core_types::dna::entry_types::Sharing;
use hdk::holochain_core_types::{entry::Entry, validation::EntryValidationData, validation::LinkValidationData};
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

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub struct Transaction {
    title: String,
    description: String,
    required: u64,
    signed: Vec<Address>,
    creator: Address,
    //TODO: figure out how to call functions of another DNA
    dna: Address,
    destination: Address,
    executed: bool,
    data: Entry
}

impl Transaction{
    pub fn new(title: String, description: String, required: u64, dna: Address, destination: Address, data: Entry) -> Self {
        Transaction {
            title,
            description,
            required,
            signed: vec![AGENT_ADDRESS.clone()],
            creator: AGENT_ADDRESS.clone(),
            //TODO: figure out how to call functions of another DNA
            dna,
            destination,
            executed: false,
            data
        }
    }

}
